import Vue from 'vue';

import {
  SET_API,
} from './mutation-types';

export function setApi({ commit }, status) {
  commit(SET_API, status);
}