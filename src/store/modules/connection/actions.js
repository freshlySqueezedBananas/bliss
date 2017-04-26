import Vue from 'vue';

import {
  SET_API,
  SET_SERVER,
} from './mutation-types';

export function setApi({ commit }, status) {
  commit(SET_API, status);
}

export function setServer({ commit }, status) {
  commit(SET_SERVER, status);
}