import Vue from 'vue';
import uuid from 'uuid';

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
  commit(SET_FILTER, 0);

  return Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?'+state.limit+'&'+state.offset+'&'+state.filter)
    .then((response) => commit(SEARCH_QUESTIONS, response.data))
}

export function updateFilter({ commit }, filter) {
  commit(SET_FILTER, filter);
}

/*export function saveProduct({ commit, state }, product) {
  const index = state.all.findIndex((p) => p.id === product.id);

  // update product if it exists or create it if it doesn't
  if (index !== -1) {
    commit(UPDATE_PRODUCT, product)
  } else {
    product.id = uuid.v4();
    commit(CREATE_PRODUCT, product)
  }
}

export function deleteProduct ({ commit }, productId) {
  commit(DELETE_PRODUCT, productId)
}*/