import * as actions from './actions';
import * as getters from './getters';

const initial = {
  server: true,
  api: null
}

import {
  SET_API,
  SET_SERVER
} from './mutation-types';

const mutations = {
  [SET_API] (state, status) {
    state.api = status;
  },
  [SET_SERVER] (state, status) {
    state.server = status;
  },
}

export default {
  state: { ...initial },
  actions,
  getters,
  mutations
}