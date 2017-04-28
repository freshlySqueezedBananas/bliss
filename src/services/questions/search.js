import Vue from 'vue';
import store from '../../store';

import fetch from './fetch';
const success = (response) => {
  let status = false;

  switch(response.status) {
    case 200:
      if (response.data) {
        status = true;
      }
    break;
  }

  store.dispatch('addQuestions', response.data);
  console.log(store.state.questions);
}

const fail = (error) => {
  store.dispatch('addQuestions', {});
}

export default (filter) => {

  store.dispatch('setFilter', filter);
  return fetch();
}
