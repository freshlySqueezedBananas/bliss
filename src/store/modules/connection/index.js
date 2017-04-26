import * as actions from './actions';
import * as getters from './getters';

const initial = {
  server: true,
  api: false
}

import {
  SET_API
} from './mutation-types';

const mutations = {
  [SET_API] (state, status) {
    state.api = status;
  },
}

export default {
  state: { ...initial },
  actions,
  getters,
  mutations
}