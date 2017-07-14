import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import login from './modules/login';
import meta from './modules/meta';
import banners from './modules/banners';
import adhubApi from './modules/adhub-api';
import bannerPreview from './modules/banner-preview';
import bannerSettings from './modules/banner-settings';
import campaign from './modules/campaign';
import progress from './modules/progress';
import dashboard from './modules/dashboard';

export default {
  plugins: [
    createPersistedState()
  ],

  modules: {
    adhubApi: {
      namespaced: true,
      ...adhubApi
    },

    login: {
      ...login
    },

    meta,

    banners,

    bannerPreview,

    bannerSettings,

    campaign,

    progress,

    dashboard: {
      namespaced: true,
      ...dashboard
    }
  },

  strict: true
};
