import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Simplert from 'vue2-simplert'
import { Ok, Error } from 'folktale/result';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import Modal from '@/components/Modal/Modal';
import ImageGridPicker from '@/components/ImageGridPicker/ImageGridPicker';
import { CarouselPlaceholder } from '@/components/BannerPlaceholder';

const variantsPopulated =
  (variants, individualSlides, universalSlides) =>
    variants === null || Object.keys(individualSlides).length < 1 || universalSlides.length < 1
      ? Error(0)
      : Ok({ variants, individualSlides, universalSlides });

export default {
  name: 'textSettings',

  components: {
    breadcrumbs: Breadcrumbs,
    simplert: Simplert,
    modal: Modal,
    imagePicker: ImageGridPicker,
    carouselPlaceholder: CarouselPlaceholder,
  },

  data() {
    return {
      currentEdit: null,
      previewFrameLoaded: false,
      errors: [],
    }
  },

  computed: {
    ...mapGetters([
      'previewFrame',
      'settingsVariants',
      'previewGenerationInProgress',
      'bannersAll',
      'settingsSlidesPopulated',
      'settingsSlidesType',
      'settingsUniversalSlides',
      'settingsIndividualSlides',
    ]),

    individualSlides() {
      if (this.currentEdit) {
        return this.settingsIndividualSlides[this.currentEdit.forIdx];
      }
      return [];
    },

    totalVariantsCount() {
      // if there are variants or any slides type,
      // sum the total number of slides from active variants,
      // otherwise return 0(zero)
      return variantsPopulated(this.settingsVariants, this.settingsIndividualSlides,
        this.settingsUniversalSlides
      )
        .map(({ variants, individualSlides, universalSlides }) =>
          Object.keys(variants)
            .map(key => {
              const slides = this.settingsSlidesType === 0
                ? individualSlides[key]
                : universalSlides;

              return {
                variant: variants[key],
                slides: slides.filter(slide => slide.checked === true)
              };
            })
            .filter(item => item.variant.VariantActive === true)
            .reduce((acc, val) => acc + val.slides.length, 0)
        )
        .getOrElse(0);
    }
  },

  methods: {
    ...mapActions([
      'changePageTitle',
      'previewGenerateBanner',
      'campaignCheckProgress',
      'previewGenerateVariants',
      'previewToggleActive',
      'previewVariantEditContentField',
      'previewVariantEditHeadlineField',
      'previewVariantEditDescriptionField',
      'previewToggleSlidesType',
      'bannersPrefetchAll',
      'previewPopulateSlides',
      'previewToggleUniversalSlides',
      'previewToggleIndividualSlides',
    ]),

    gotoNextStep() {
      // because we rely on "reactivity", reset errors so that if neither of the
      // conditions match, we can automagically assume we can go to next step
      this.errors = [];

      if (this.settingsSlidesType === 0) {
        this.errors = Object.keys(this.settingsVariants)
          .map(k => this.settingsVariants[k])
          .filter(variant => variant.VariantActive === true)
          .map(variant => {
            const slides = this.settingsIndividualSlides[variant.VariantID];
            return {
              hasErrors: slides.filter(item => item.checked === true).length < 2,
              description: `Variant ${variant.VariantID + 1} should have at least 2 images selected`
            }
          })
          .filter(variant => variant.hasErrors === true);
      }
      else {
        const totalCheckedSlides = this.settingsUniversalSlides
          .filter(slide => slide.checked === true)
          .length;

        if (totalCheckedSlides < 2) {
          this.errors = [{
            description: "You should select at least 2 slides for each variant"
          }];
        }
      }

      this.errors.length === 0 && this.campaignCheckProgress(3);
    },

    handleVariantEditOpen(item, forIdx) {
      this.currentEdit = { item, forIdx };
    },

    handleVariantEditClose() {
      this.currentEdit = null;
    },

    handleVariantEditCancel() {
      this.currentEdit = null;
    },

    handleVariantToggleActive(item) {
      const activeVariants = Object.keys(this.settingsVariants)
        .map(key => this.settingsVariants[key])
        .filter(item => item.VariantActive);

      const exactlyTwoVariants = activeVariants.length === 2;

      if (exactlyTwoVariants && item.VariantActive === true) {
        this.$refs.simplert.openSimplert({
          message: 'Du skal i det mindste vælge varianter',
          type: 'info',
          customCloseBtnClass: 'btn btn-primary'
        });
      } else {
        this.previewToggleActive(item);
      }

      // because checkboxes
      this.$forceUpdate();
    },

    handleOpenUniversalSlidesModal() {
      this.$refs.modalUniversal.show();
    },

    handleCloseUniversalSlidesModal() {
      this.$refs.modalUniversal.hide();
    },

    handleOpenIndividualSlidesModal() {
      this.$refs.modalIndividual.show();
    },

    handleCloseIndividualSlidesModal() {
      this.$refs.modalIndividual.hide();
    },

    handleImageToggle(item) {
      if (this.settingsSlidesType === 0) {
        this.previewToggleIndividualSlides({ slideIdx: this.currentEdit.forIdx, item });
      } else {
        this.previewToggleUniversalSlides(item);
      }
    },

    handleBannerGeneratePreview(item) {
      const slides = this.settingsSlidesType === 0
        ? this.settingsIndividualSlides[item.VariantID]
        : this.settingsUniversalSlides;

      if (slides.filter(slide => slide.checked === true).length < 2) {
        this.errors = [{
          variant: item.VariantID,
          description: `Variant ${item.VariantID + 1} should have at least 2 images selected`
        }];
      }
      else {
        this.previewGenerateBanner({
          variant: item,
          slides: slides
        });
        this.errors = [];
      };
    },

    problemMessagePluralize(number) {
      if (number > 1) {
        return `${number} problems`;
      }
      return '1 problem';
    }
  },

  watch: {
    previewGenerationInProgress: function(inProgress) {
      if (inProgress) {
        this.previewFrameLoaded = false;
      }
    },

    currentEdit: function(currentEdit) {
      if (currentEdit !== null) {
        this.individualSlides = this.settingsIndividualSlides[currentEdit.forIdx];
      }
    }
  },

  created() {
    this.changePageTitle('Opsætning & redigéring af tekster');

    this.bannersPrefetchAll()
      .then((banners) => {
        if (this.settingsVariants === null) {
          this.previewGenerateVariants();
        }
        if (this.settingsSlidesPopulated === false) {
          this.previewPopulateSlides(banners);
        }
      });
  },

  updated() {
    const previewBanner = this.$refs.previewBanner;

    if (previewBanner) {
      const previewChildren =  previewBanner.children;

      if (previewChildren.length && previewChildren[0]) {
        let frameEl = previewChildren[0];

        if (frameEl && frameEl.tagName == 'IFRAME') {
          frameEl.setAttribute('scrolling', 'no')
          frameEl.onload = () => {
            this.previewFrameLoaded = true;
          }
        }
      }
    }
  }
};