 import * as actions from './actions'
import * as getters from './getters'

const initial = {
  processing: false,
  limit: 10,
  offset: 0,
  filter: '',
  question: {},
  all: []
}


import {
  ADD_QUESTIONS,
  SET_QUESTION,
  SET_QUESTIONS,
  SET_LIMIT,
  SET_OFFSET,
  SET_FILTER
} from './mutation-types'

const mutations = {
  [ADD_QUESTIONS] (state, questions) {
    state.all = state.all.concat(questions)
    state.offset += questions.length
  },
  [SET_QUESTIONS] (state, questions) {
    state.all = questions
    state.offset = questions.length
  },
  [SET_QUESTION] (state, question) {
    state.question = question
  },
  [SET_LIMIT] (state, limit) {
    state.limit = limit
  },
  [SET_OFFSET] (state, offset) {
    state.offset = offset
  },
  [SET_FILTER] (state, filter) {
    state.filter = filter
  }
}


export default {
  state: { ...initial },
  actions,
  getters,
  mutations
}
