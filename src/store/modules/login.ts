import Maybe, { Just, Nothing } from 'folktale/maybe';


const LOGIN_ATTEMPT_START = 'LOGIN_ATTEMPT_START';
const LOGIN_ATTEMPT_ERROR = 'LOGIN_ATTEMPT_ERROR';
const LOGIN_ATTEMPT_FINISHED = 'LOGIN_ATTEMPT_FINISHED';
const LOGIN_ATTEMPT_SUCCESSFUL = 'LOGIN_ATTEMPT_SUCCESSFUL';
const LOGIN_DISCONNECT_USER = 'LOGIN_DISCONNECT_USER';

const initialState = {
  attemptInProgress: false,
  loginErrors: {email: null, pass: null, description: ''},
  loggedIn: false,
  user: null
}

const getters = {
  loginErrors: state => state.loginErrors,
  attemptInProgress: state => state.attemptInProgress,
  loggedIn: state => state.loggedIn,
  userData: state => state.user
}

const validateField = (value: string): Maybe<boolean> =>
  value.trim().length > 0 ? Just(true) : Nothing();

const actions = {
  loginAttempt({commit, dispatch}, {email, password}) {
    commit(LOGIN_ATTEMPT_START);

    var params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', email);
    params.append('password', password);

    // commented for mvp demo
    /*dispatch('adhubApi/post', { resource: '/token', params })
      .then(r => commit(LOGIN_ATTEMPT_SUCCESSFUL))
      .catch(e => commit(LOGIN_ATTEMPT_ERROR, e))*/

    // validate email, then validate the password and error if one or both fail
    validateField(email)
      .chain(() => validateField(password))
      .map(() => commit(LOGIN_ATTEMPT_SUCCESSFUL, { email }))
      .orElse(() => commit(LOGIN_ATTEMPT_ERROR, { data: "invalid email or password" }))
  },

  resetLoginAttempt({commit}) {
    commit(LOGIN_ATTEMPT_FINISHED);
  },

  logoutUser({ commit }) {
    commit(LOGIN_DISCONNECT_USER);
  }
}

const mutations = {
  [LOGIN_ATTEMPT_ERROR]: function(state, err) {
    state.loginErrors = {
      email: {type: 'INVALID_EMAIL', desc: 'invalid email'},
      pass: {type: 'INVALID_PASSWORD', desc: 'invalid pass'},
      description: err.data,
      loggedIn: false,
      user: null
    }
  },

  [LOGIN_ATTEMPT_START]: (state) => {
    state.attemptInProgress = true;
  },

  [LOGIN_ATTEMPT_FINISHED]: (state) => {
    state.attemptInProgress = false;
    state.loginErrors = {email: null, pass: null, description: ''};
  },

  [LOGIN_ATTEMPT_SUCCESSFUL]: (state, { email }) => {
    state.attemptInProgress = false;
    state.loginErrors = {email: null, pass: null, description: ''};
    state.loggedIn = true;
    state.user = { email };
  },

  [LOGIN_DISCONNECT_USER]: function(state) {
    state.attemptInProgress = false;
    state.loginErrors = {email: null, pass: null, description: ''};
    state.loggedIn = false;
    state.user = null;
  }
}

export default {
  getters,
  state: initialState,
  actions,
  mutations
}
