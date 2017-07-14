const CHANGE_PAGE_TITLE = 'CHANGE_PAGE_TITLE';

const initialState = {
  pageTitle: ''
};

const getters = {
  pageTitle: state => state.pageTitle
};

const actions = {
  changePageTitle({ commit }, title) {
    commit(CHANGE_PAGE_TITLE, title);
  }
};

const mutations = {
  /* eslint-disable */
  [CHANGE_PAGE_TITLE]: function(state, title) {
    state.pageTitle = title;
  }
};

export default {
  getters,
  state: initialState,
  actions,
  mutations
}
