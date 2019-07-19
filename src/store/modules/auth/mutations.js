import {
  CLEAR,
  LOGIN,
  FAILED,
} from './mutation-types';
import { state as initialState } from './state';

export default {
  [CLEAR](state) {
    Object.assign(state, initialState());
  },
  [LOGIN](state) {
    state.auth = true;
    state.error = null;
  },
  [FAILED](state, payload) {
    state.auth = false;
    state.error = payload;
  },
};
