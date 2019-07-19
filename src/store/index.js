import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

// Modules
import auth from './modules/auth';
import account from './modules/account';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth,
    account,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
