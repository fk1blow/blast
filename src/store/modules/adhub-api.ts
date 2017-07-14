import { post as postAdapter, get as getAdapter } from '@/lib/adhub/adapters/axios-adapter';
import resourceFactory from '@/lib/adhub/resource';

const adhubResource = resourceFactory(API_URL);

const post = (resource, params, headers) =>
  adhubResource(postAdapter, resource, params, headers);

const get = (resource, params, headers) =>
  adhubResource(getAdapter, resource, params, headers);

const AUTH_ATTEMPT = 'USER_LOGIN_ATTEMPT';
const AUTH_SUCCESS = 'USER_LOGIN_SUCCESS';
const AUTH_SET_TOKEN = 'USER_SET_TOKEN';

const initialState = {
  access_token: undefined,
};

const getters = {
  user: state => state.user
};

/*
  The repetitive code for both `get` and `post` is there because i don't
  know for sure if 'stuff' will gonna be different(or how) between the two
  types of requests. TBD!
*/
const actions = {
  get({ commit, state }, { resource, params = {}, headers = {} }) {
    let authHeaders = { "Authorization": `bearer ${state.access_token}` };
    let customHeaders = headers;

    if (state.access_token) {
      customHeaders = { ...authHeaders, ...customHeaders };
    }

    return get(resource, params, customHeaders)
      .then(res => {
        if (res.data.access_token) {
          commit(AUTH_SET_TOKEN, res.data.access_token);
        }
        return res;
      })
      .catch(err => {
        if (err.data.access_token) {
          commit(AUTH_SET_TOKEN, err.data.access_token);
        }
        return err;
      });
  },

  post({ commit, state }, { resource, params, headers }) {
    let authHeaders = { "Authorization": `bearer ${state.access_token}` };
    let customHeaders = headers;

    if (state.access_token) {
      customHeaders = { ...authHeaders, ...customHeaders };
    }

    return post(resource, params, customHeaders)
      .then(res => {
        if (res.data.access_token) {
          commit(AUTH_SET_TOKEN, res.data.access_token);
        }
        return res;
      })
      .catch(err => {
        if (err.data.access_token) {
          commit(AUTH_SET_TOKEN, err.data.access_token);
        }
        return err;
      });
  }
};

const mutations = {
  [AUTH_SET_TOKEN]: function(state, token) {
    state.access_token = token;
  }
};

export default {
  getters,
  state: initialState,
  actions,
  mutations
}
