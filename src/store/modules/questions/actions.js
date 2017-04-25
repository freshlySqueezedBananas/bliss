import Vue from 'vue';

import {
  FETCH_QUESTIONS,
  SEARCH_QUESTIONS,
  SET_OFFSET,
  SET_FILTER,
} from './mutation-types';

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

export function share({ commit }, { email, link }) {
  console.log('shared');
}