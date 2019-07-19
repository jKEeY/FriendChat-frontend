// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store';

import { router } from './plugins/vue-router';
import './plugins/vuetify';
import './plugins/vuex';
import './plugins/vue-socketio';

Vue.config.productionTip = false;

store.dispatch('auth/check');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
