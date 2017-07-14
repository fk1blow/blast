import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { Ok, Error } from 'folktale/result';
import BudgetType from '@/lib/budget-type';
import CampaingType from '@/lib/campaign-type';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
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
    carouselPlaceholder: CarouselPlaceholder,
  },

  data() {
    return {
      previewFrameLoaded: false
    }
  },

  computed: {
    ...mapGetters([
      'campaignBudget',
      'previewFrame',
      'campaignStartDate',
      'campaignName',
      'campaignType',
      'previewGenerationInProgress',
      'settingsVariants',
      'settingsSlidesType',
      'settingsUniversalSlides',
      'settingsIndividualSlides',
    ]),

    budgetTypeName() {
      return BudgetType[this.campaignBudget.type]
    },

    campaignTypeName() {
      return CampaingType[this.campaignType];
    }
  },

  watch: {
    previewGenerationInProgress: function(inProgress) {
      if (inProgress) {
        this.previewFrameLoaded = false;
      }
    }
  },

  methods: {
    ...mapActions([
      'changePageTitle',
      'previewGenerateBanner',
      'campaignCheckProgress',
    ])
  },

  created() {
    this.changePageTitle('Gennemse og godkend');
    // this.campaignCheckProgress(3);

    variantsPopulated(this.settingsVariants, this.settingsIndividualSlides,
      this.settingsUniversalSlides
    )
      .map(({ variants, individualSlides, universalSlides }) => {
        const variant = Object.keys(variants)
          .map(key => variants[key])
          .find(variant => variant.VariantActive === true);

        const slides = this.settingsSlidesType === 0
          ? individualSlides[variant.VariantID]
          : universalSlides;

        this.previewGenerateBanner({
          variant: variant,
          slides: slides
        });
      })
  },

  updated() {
    let previewChildren =  this.$refs.previewBanner.children;

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
};