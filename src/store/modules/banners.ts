const LOAD_BANNERS_IN_START = 'LOAD_BANNERS_IN_START';
const LOAD_BANNERS_SUCCESSFUL = 'LOAD_BANNERS_SUCCESSFUL';
const LOAD_BANNERS_ERROR = 'LOAD_BANNERS_ERROR';
const BANNER_TOGGLE_CHECKED = 'BANNER_TOGGLE_CHECKED';
const BANNER_TOGGLE_RESET_ALL = 'BANNER_TOGGLE_RESET_ALL';
const BANNER_TOGGLE_TO_LESS_IMAGES = 'BANNER_TOGGLE_TO_LESS_IMAGES';
const BANNER_TOGGLE_TO_LESS_RESET = 'BANNER_TOGGLE_TO_LESS_RESET';

const initialState = {
  banners: null,
  loading: false,
  toLess: false
};

const getters = {
  bannersAll: state => state.banners,
  bannersToLess: state => state.toLess
};

const actions = {
  bannersPrefetchAll({ commit, state }) {
    if (!state.banners) {
      commit(LOAD_BANNERS_IN_START);

      const mockImages = [
        // { path: `http://static.1stweb-staging.net/adhubmockbanners/pexels-photo-105829.jpeg`},
        { path: `http://static.1stweb-staging.net/adhubmockbanners/pexels-photo-160158.jpeg`},
        { path: `http://static.1stweb-staging.net/adhubmockbanners/pexels-photo-173460.jpeg`},
        { path: `http://static.1stweb-staging.net/adhubmockbanners/pexels-photo-201537.jpeg`},
        { path: `http://static.1stweb-staging.net/adhubmockbanners/pexels-photo-220820.jpeg`},
        { path: `http://static.1stweb-staging.net/adhubmockbanners/pexels-photo-261146.jpeg`},
        { path: `http://static.1stweb-staging.net/adhubmockbanners/pexels-photo-271815.jpeg`},
        { path: `http://static.1stweb-staging.net/adhubmockbanners/pexels-photo-296109.jpeg`},
        { path: `http://static.1stweb-staging.net/adhubmockbanners/pexels-photo-323774.jpeg`},
        // { path: require(`@/assets/images/mock-banners/pexels-photo-323775.jpeg`)}
      ];

      commit(LOAD_BANNERS_SUCCESSFUL,
        // mockImages.map((item, idx) => ({ ...item, id: idx, checked: true })));
        mockImages.map((item, idx) => ({ ...item, id: idx })));

      // simulates a fetch
      // TODO: must use the api when its ready
      return Promise.resolve(state.banners);
    }
    else {
      return Promise.resolve(state.banners);
    }
  },

  bannersToggleChecked({ commit, state, dispatch }, item) {
    const bannersLen = state.banners.filter(i => i.checked !== false).length;
    const greaterThanLower = bannersLen > 2;
    const atLowerLimit = bannersLen == 2;
    const toBeChecked = item.checked === false;

    if (greaterThanLower || atLowerLimit && toBeChecked) {
      commit(BANNER_TOGGLE_CHECKED, item);
      commit(BANNER_TOGGLE_TO_LESS_RESET);

      console.info('a dispatch to `campaignAddBanners` has been removed! Instead, get all the banners from this store and filter the ones that are checked')
      // dispatch('campaignAddBanners',
      //   state.banners.filter(item => item.checked).map(({ id }) => id));
    } else {
      commit(BANNER_TOGGLE_TO_LESS_IMAGES);
    }
  },

  bannersResetAll({ commit }) {
    commit(BANNER_TOGGLE_RESET_ALL);
  },

  bannersToLessReset({ commit }) {
    commit(BANNER_TOGGLE_TO_LESS_RESET);
  },

  bannersGetAllSelected({ state }) {
    return Promise.resolve(state.banners);
  }
};

const mutations = {
  [LOAD_BANNERS_IN_START]: function(state) {
    state.loading = true;
  },

  [LOAD_BANNERS_ERROR]: function(state) {
    state.loading = false;
  },

  [LOAD_BANNERS_SUCCESSFUL]: function(state, banners) {
    state.loading = false;
    state.banners = banners;
  },

  [BANNER_TOGGLE_CHECKED]: function(state, item) {
    const { banners } = state;
    const idx = banners.findIndex((elem, idx, arr) => elem.id == item.id)

    if (idx >= 0) {
      let newBannerItem = {
        ...banners[idx],
        checked: !banners[idx].checked
      };

      state.banners = [
        ...banners.slice(0, idx),
        newBannerItem,
        ...banners.slice(idx + 1, banners.length)
      ]
    }
  },

  [BANNER_TOGGLE_RESET_ALL]: function(state, item) {
    for(let banner in state.banners) {
      state.banners = state.banners.map(item => ({ ...item, checked: true }))
    }
  },

  [BANNER_TOGGLE_TO_LESS_IMAGES]: function(state) {
    state.toLess = true;
  },

  [BANNER_TOGGLE_TO_LESS_RESET]: function(state) {
    state.toLess = false;
  }
};

export default {
  getters,
  state: initialState,
  actions,
  mutations
}
