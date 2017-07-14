import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import VueSVGIcon from 'vue-svgicon'
import Maybe, { Just, Nothing } from 'folktale/maybe';
import stores from './store';
import routes from './routes';
import App from './App.vue';

Vue.use(Vuex);
Vue.use(Router);
Vue.use(VueSVGIcon);

// don't show the warning about running in prod mode
Vue.config.productionTip = false;

// create the store with its configuration
const store = new Vuex.Store(stores);

// create the router and add the configured routes
const router = new Router({
  routes,
  mode: 'history'
});

sync(store, router);

// create the new vue app passing the router and the store
const app = new Vue({
  router,
  store,
  render: h => h(App)
});

// mount vue app at the '#app' element
app.$mount('#app');
