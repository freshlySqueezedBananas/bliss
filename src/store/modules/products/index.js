// src/vuex/modules/products/index.js
import * as actions from './actions';
import * as getters from './getters';
import {
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
} from './mutation-types'

// initial state
const initialState = {
  all: []
}

// mutations
const mutations = {
  [FETCH_PRODUCTS] (state, products) {
    // assign the products that we got from our FETCH_PRODUCTS event to state.all
    state.all = products
  },

  [CREATE_PRODUCT] (state, product) {
    state.all.push(product);
  },

  [UPDATE_PRODUCT] (state, product) {
    const index = state.all.findIndex((p) => p.id === product.id);

    if (index !== -1) {
      // We need to replace the array entirely so that vue can recognize
      // the change and re-render entirely.
      // See http://vuejs.org/guide/list.html#Caveats
      state.all.splice(index, 1, product)
    }
  },

  [DELETE_PRODUCT] (state, productId) {
    state.all = state.all.filter(p => p.id !== productId);
  }
}

export default {
  state: { ...initialState },
  // OBS! Don't forget to export your actions from the products module as well.
  actions,
  getters,
  mutations
}