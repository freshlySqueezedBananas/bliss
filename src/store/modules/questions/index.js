// src/vuex/modules/products/index.js
import * as actions from './actions';
import * as getters from './getters';
import {
  FETCH_QUESTIONS,
} from './mutation-types'

// initial state
const initialState = {
  limit: 10,
  offset: 0,
  filter: '',
  all: []
}

// mutations
const mutations = {
  [FETCH_QUESTIONS] (state, questions) {
    // assign the questions that we got from our FETCH_QUESTIONS event to state.all
    state.all = questions
  },
}

export default {
  state: { ...initialState },
  // OBS! Don't forget to export your actions from the products module as well.
  actions,
  getters,
  mutations
}