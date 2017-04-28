import Vue from 'vue';

import {
  UPDATE_QUESTION,
  ADD_QUESTIONS,
  SET_QUESTION,
  SET_QUESTIONS,
  SET_OFFSET,
  SET_FILTER,
  SET_PROCESSING
} from './mutation-types';

export function setQuestion({ commit }, data) {
  commit(SET_QUESTION, data);
}

export function setQuestions({ commit }, data) {
  commit(SET_QUESTIONS, data);
}

export function addQuestions({ commit }, data) {
  commit(ADD_QUESTIONS, data);
}

export function setProcessing({ commit }, data) {
  commit(ADD_QUESTIONS, data);
}

export function updateFilter({ commit }, filter) {
  commit(SET_FILTER, filter);
}

export function setFilter({ commit }, filter) {
  commit(SET_FILTER, filter);
}

export function share({ email, url }) {
  return Vue.$http.post('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/share?'+email+'&'+url)
}

export function voteQuestion({ commit, state }, { choice }) {
  let updated = Object.assign({}, state.question);
  let index =  _.findIndex(updated.choices, function(i) { return i.choice == choice });
  updated.choices[index].votes++;

  return Vue.$http.put('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/'+updated.id, choice)
    .then(() => commit(UPDATE_QUESTION, updated))
}