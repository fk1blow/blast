import axios from 'axios';

const PREVIEW_GENERATE_URL_START = 'PREVIEW_GENERATE_URL_START';
const PREVIEW_GENERATE_URL_SUCCESS = 'PREVIEW_GENERATE_URL_SUCCESS';
const PREVIEW_GENERATE_URL_ERROR = 'PREVIEW_GENERATE_URL_ERROR';

const initialState = {
  previewFrame: null,
  previewGenerationInProgress: false,
};

const getters = {
  previewFrame: state => state.previewFrame,
  previewGenerationInProgress: state => state.previewGenerationInProgress,
};

const actions = {
  previewGenerateBanner({ commit, state }, { variant, slides }) {
    commit(PREVIEW_GENERATE_URL_START);

    const previewSlides = slides
      .filter(slide => slide.checked === true)
      .map(slide => {
        return {
          ImageLink: slide.path,
          Headline: variant.MetaDescription.Headline,
          Description: variant.MetaDescription.Description
        }
      });

    // this is temporary; the call should go through adhubcnb-api store
    // when the api is stable enough
    const previewRequest = axios({
      method: 'post',
      url: 'http://cnb.1stweb-dev.net/umbraco/api/facebookpreview/getpreview',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: JSON.stringify({
        ...variant.MetaDescription,
        "ListOfChildImages": previewSlides
      })
    })
    .then(res => commit(PREVIEW_GENERATE_URL_SUCCESS, res.data))
    .catch(err => commit(PREVIEW_GENERATE_URL_ERROR))
  },
};

const mutations = {
  [PREVIEW_GENERATE_URL_START]: function(state) {
    state.previewGenerationInProgress = true;
  },

  [PREVIEW_GENERATE_URL_SUCCESS]: function(state, preview) {
    state.previewFrame = preview;
    state.previewGenerationInProgress = false;
  },

  [PREVIEW_GENERATE_URL_ERROR]: function(state) {
    state.previewFrame = null;
    state.previewGenerationInProgress = false;
  },
};

export default {
  getters,
  state: initialState,
  actions,
  mutations
}
