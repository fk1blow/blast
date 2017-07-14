
const gk = (key: string) => (state: object) => state[key];

const initialState = {
  visible: false,
  disabled: false,
  currentScreen: null
};

const getters = {
  currentScreen: gk('currentScreen'), // ????
  progressShouldBeVisible: gk('visible')
};

const PROGRESS_HIDE_UI = 'PROGRESS_HIDE_UI';
const PROGRESS_SHOW_UI = 'PROGRESS_SHOW_UI';
const PROGRESS_CHANGE_VALUE = 'PROGRESS_CHANGE_VALUE';

const actions = {
  progressHide: ({ commit }) => commit(PROGRESS_HIDE_UI),
  showProgress: ({ commit }) => commit(PROGRESS_SHOW_UI),
  progressChangeValue: ({ commit }, val) => commit(PROGRESS_CHANGE_VALUE, val)
};

const mutations = {
  [PROGRESS_HIDE_UI]: (state) => state.visible = false,
  [PROGRESS_SHOW_UI]: (state) => state.visible = true,
  [PROGRESS_CHANGE_VALUE]: (state) => {}
};

export default {
  getters,
  state: initialState,
  actions,
  mutations
}
