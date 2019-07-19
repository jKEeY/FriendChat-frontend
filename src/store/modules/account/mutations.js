import {
  FIND,
} from './mutation-types';

export default {
  [FIND](state, payload) {
    Object.assign(state, payload);
  },
};
