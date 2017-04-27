import Vue from 'vue';

import {
  FETCH_QUESTIONS,
  FETCH_QUESTION,
  SEARCH_QUESTIONS,
  UPDATE_QUESTION,
  SET_QUESTION,
  SET_OFFSET,
  SET_FILTER,
} from './mutation-types';

export function setQuestion({ commit }, data) {
  commit(SET_QUESTION, data);
}

export function fetchQuestion({ commit }, questionId) {
  return Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/'+questionId)
    .then((response) => commit(FETCH_QUESTION, response.data))
}

export function fetchQuestions({ commit, state }) {
  return Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?'+state.limit+'&'+state.offset+'&'+state.filter)
    .then((response) => commit(FETCH_QUESTIONS, response.data))
}

export function searchQuestions({ commit, state }) {
  commit(SET_OFFSET, 0);

  return Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?'+state.limit+'&'+state.offset+'&'+state.filter)
    .then((response) => commit(SEARCH_QUESTIONS, response.data))
}

export function updateFilter({ commit }, filter) {
  commit(SET_FILTER, filter);
}

export function share({ email, url }) {
  return Vue.$http.post('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/share?'+email+'&'+url)
}

export function voteQuestion({ commit, state }, { questionId, choice }) {
  let updated = Object.assign({}, state.question);
  let index =  _.findIndex(updated.choices, function(i) { return i.choice == choice });
  updated.choices[index].votes++;

  return Vue.$http.put('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/'+questionId, choice)
    .then(() => commit(UPDATE_QUESTION, updated))
}