import Vue from 'vue'

import {
  ADD_QUESTIONS,
  SET_QUESTION,
  SET_QUESTIONS,
  SET_OFFSET,
  SET_FILTER,
} from './mutation-types'

export function setQuestion({ commit }, data) {
  commit(SET_QUESTION, data)
}

export function setQuestions({ commit }, data) {
  commit(SET_QUESTIONS, data)
}

export function addQuestions({ commit }, data) {
  commit(ADD_QUESTIONS, data)
}

export function setFilter({ commit }, filter) {
  commit(SET_FILTER, filter)
}
