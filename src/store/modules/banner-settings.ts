import axios from 'axios';

enum SlidesType {
  IndividualSlides,
  SameSlides
}

const PREVIEW_GENERATE_VARIANTS = 'PREVIEW_GENERATE_VARIANTS';
const PREVIEW_VARIANTS_RESET = 'PREVIEW_VARIANTS_RESET;'
const PREVIEW_VARIANT_TOGGLE_ACTIVE = 'PREVIEW_VARIANT_TOGGLE_ACTIVE';
const PREVIEW_VARIANT_EDIT_CONTTENT_FIELD = 'PREVIEW_VARIANT_EDIT_CONTTENT_FIELD';
const PREVIEW_VARIANT_EDIT_HEADLINE_FIELD = 'PREVIEW_VARIANT_EDIT_HEADLINE_FIELD';
const PREVIEW_VARIANT_EDIT_DESCRIPTION_FIELD = 'PREVIEW_VARIANT_EDIT_DESCRIPTION_FIELD';

const PREVIEW_TOGGLE_SLIDES_TYPE = 'PREVIEW_TOGGLE_SLIDES_TYPE';
const PREVIEW_TOGGLE_UNIVERSAL_SLIDES = 'PREVIEW_TOGGLE_UNIVERSAL_SLIDES';
const PREVIEW_TOGGLE_INDIVIDUAL_SLIDES = 'PREVIEW_TOGGLE_INDIVIDUAL_SLIDES';

const PREVIEW_POPULATE_UNIVERSAL_SLIDES = 'PREVIEW_POPULATE_UNIVERSAL_SLIDES';
const PREVIEW_POPULATE_INDIVIDUAL_SLIDES = 'PREVIEW_POPULATE_INDIVIDUAL_SLIDES';
const PREVIEW_SLIDES_POPULATED = 'PREVIEW_SLIDES_POPULATED';

const PreviewMetadescription = {
  "Cta": "OPEN_LINK",

  "Description": "DESCRIPTION",
  "LandingPage": "https://adhub.dk",

  "Content": "My Facebook Banner",
  "Headline": "HEADLINE TEXT",

  "Image": "https://adhub.dk/logo1024x768.png",
  "Pageid": "149930191769005",
  "Adformat": "DESKTOP_FEED_STANDARD",
  "width": 500,
  "height": 516,
};

const initialState = {
  variants: null,
  slidesType: SlidesType.SameSlides,
  universalSlides: [],
  individualSlides: {},
  previewSlidesPopulated: false,
};

const getters = {
  settingsVariants: state => state.variants,
  settingsSlidesType: state => state.slidesType,
  settingsUniversalSlides: state => state.universalSlides,
  settingsIndividualSlides: state => state.individualSlides,
  settingsSlidesPopulated: state => state.previewSlidesPopulated,
};

const actions = {
  previewResetFields({ commit }) {
    commit(PREVIEW_VARIANTS_RESET);
  },

  previewGenerateVariants({ dispatch, commit }) {
    const variants = Array(5)
      .fill({})
      .map((item, idx) => ({
          "Headline": `Name ${idx}`,
          "Description": `Description ${idx}`,
          "ImageLink": item.path,
          "Link": "https://adhub.dk",
      }));

    commit(PREVIEW_GENERATE_VARIANTS, variants)
  },

  previewPopulateSlides({ commit, state }, banners) {
    commit(PREVIEW_POPULATE_UNIVERSAL_SLIDES, banners);
    commit(PREVIEW_POPULATE_INDIVIDUAL_SLIDES, banners);
    commit(PREVIEW_SLIDES_POPULATED);
  },

  previewToggleActive({ commit, dispatch }, item) {
    commit(PREVIEW_VARIANT_TOGGLE_ACTIVE, item);
  },

  previewVariantEditContentField({ commit }, edit) {
    commit(PREVIEW_VARIANT_EDIT_CONTTENT_FIELD, edit);
  },

  previewVariantEditHeadlineField({ commit }, edit) {
    commit(PREVIEW_VARIANT_EDIT_HEADLINE_FIELD, edit);
  },

  previewVariantEditDescriptionField({ commit }, edit) {
    commit(PREVIEW_VARIANT_EDIT_DESCRIPTION_FIELD, edit);
  },

  previewToggleSlidesType({ commit }, toggleTo) {
    commit(PREVIEW_TOGGLE_SLIDES_TYPE, toggleTo);
  },

  previewToggleUniversalSlides({ commit }, item) {
    commit(PREVIEW_TOGGLE_UNIVERSAL_SLIDES, item);
  },

  previewToggleIndividualSlides({ commit }, { slideIdx, item }) {
    commit(PREVIEW_TOGGLE_INDIVIDUAL_SLIDES, { slideIdx, item });
  }
};

const mutations = {
  [PREVIEW_VARIANTS_RESET]: function(state) {
    state.variants = null;
    state.previewFrame = null;
    state.previewGenerationInProgress = false;
  },

  [PREVIEW_GENERATE_VARIANTS]: function(state, variants) {
    state.variants = variants
      .reduce((acc, val, idx) => {
        let metaDescription = Object.assign({}, PreviewMetadescription);
        let variantActive = state.variants && state.variants[idx].VariantActive;

        if (state.variants) {
          metaDescription = Object.assign({}, state.variants[idx].MetaDescription);
        }

        return {
          ...acc,
          [idx]: {
            VariantID: idx,
            MetaDescription: metaDescription,
            VariantActive: variantActive || (idx < 2 ? true : false)
          }
        }
      }, {});
  },

  [PREVIEW_VARIANT_TOGGLE_ACTIVE]: function(state, item) {
    state.variants[item.VariantID].VariantActive = !item.VariantActive;
  },

  [PREVIEW_VARIANT_EDIT_CONTTENT_FIELD]: function(state, edit) {
    state.variants[edit.item.VariantID].MetaDescription.Content = edit.value;
  },

  [PREVIEW_VARIANT_EDIT_HEADLINE_FIELD]: function(state, edit) {
    state.variants[edit.item.VariantID].MetaDescription.Headline = edit.value;
  },

  [PREVIEW_VARIANT_EDIT_DESCRIPTION_FIELD]: function(state, edit) {
    state.variants[edit.item.VariantID].MetaDescription.Description = edit.value;
  },

  [PREVIEW_TOGGLE_SLIDES_TYPE]: function(state, toggleTo) {
    state.slidesType = toggleTo;
  },

  [PREVIEW_POPULATE_UNIVERSAL_SLIDES]: function(state, banners) {
    state.universalSlides = banners
      .map(item => ({ ...Object.assign({}, item), checked: false }));
  },

  [PREVIEW_POPULATE_INDIVIDUAL_SLIDES]: function(state, banners) {
    state.individualSlides = Array(5)
      .fill(banners.map(item => ({ ...Object.assign({}, item), checked: false })))
      .reduce((acc, val, idx, arr) => {
        return {
          ...acc,
          [idx]: val
        }
      }, {});
  },

  [PREVIEW_SLIDES_POPULATED]: function(state) {
    state.previewSlidesPopulated = true;
  },

  [PREVIEW_TOGGLE_UNIVERSAL_SLIDES]: function(state, item) {
    const { universalSlides } = state;
    const idx = universalSlides.findIndex((elem) => elem.id == item.id)

    if (idx >= 0) {
      let newItem = {
        ...universalSlides[idx],
        checked: !universalSlides[idx].checked
      };

      state.universalSlides = [
        ...universalSlides.slice(0, idx),
        newItem,
        ...universalSlides.slice(idx + 1, universalSlides.length)
      ]
    }
  },

 [PREVIEW_TOGGLE_INDIVIDUAL_SLIDES]: function(state, { slideIdx, item }) {
    const slide = state.individualSlides[slideIdx];
    const idx = slide.findIndex((elem) => elem.id == item.id)

    if (idx >= 0) {
      let newItem = {
        ...slide[idx],
        checked: !slide[idx].checked
      };

      state.individualSlides[slideIdx] = [
        ...slide.slice(0, idx),
        newItem,
        ...slide.slice(idx + 1, slide.length)
      ]
    }
  }
};

export default {
  getters,
  state: initialState,
  actions,
  mutations
}
