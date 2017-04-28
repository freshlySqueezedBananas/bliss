 import * as actions from './actions';
import * as getters from './getters';

const initial = {
  processing: false,
  limit: 10,
  offset: 0,
  filter: '',
  question: {},
  all: []
};


import {
  UPDATE_QUESTION,
  ADD_QUESTIONS,
  SET_QUESTION,
  SET_QUESTIONS,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER,
  SET_PROCESSING
} from './mutation-types';

const mutations = {
  [UPDATE_QUESTION] (state, question) {
    state.question = question;
  },

  [ADD_QUESTIONS] (state, questions) {
    state.all = state.all.concat(questions);
    state.offset += questions.length;
  },
  [SET_QUESTIONS] (state, questions) {
    state.all = questions;
    state.offset = questions.length;
  },
  [SET_QUESTION] (state, question) {
    state.question = question;
  },
  [SET_LIMIT] (state, limit) {
    state.limit = limit;
  },
  [SET_OFFSET] (state, offset) {
    state.offset = offset;
  },
  [SET_FILTER] (state, filter) {
    state.filter = filter;
  },
  [SET_PROCESSING] (state, processing) {
    state.processing = processing;
  }
};


export default {
  state: { ...initial },
  actions,
  getters,
  mutations
}
