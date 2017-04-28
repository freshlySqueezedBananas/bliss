import Vue from 'vue';
import store from '../../store';
const success = (response) => {

  let status = false;

  switch(response.status) {
    case 200:
      status = true;
    break;
  }

  store.dispatch('setServer', status);
}

const fail = (error) => {
  store.dispatch('setServer', false);
}

export default () => {
  let origin = location.origin;

  return Vue.$http.get(origin)
  .then((response) => {
    success(response);
  })
  .catch((error) => {
    fail();
  });
}
