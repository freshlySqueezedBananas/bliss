import Vue from 'vue';
import uuid from 'uuid';

import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from './mutation-types';

export function fetchProducts ({ commit }) {
  return Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?10&0')
    .then((response) => commit(FETCH_PRODUCTS, response.data))
}

export function saveProduct({ commit, state }, product) {
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
}