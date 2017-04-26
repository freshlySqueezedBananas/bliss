import Vue from 'vue';
import store from '../../store';
const success = (response) => {

  let status = false;

  switch(response.status) {
    case 200:
      if (response.data.status == "OK") {
        status = true;
      }
    break;
  }

  store.dispatch('setApi', status);
}

const fail = (error) => {

}

export default () => {
  return Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/health')
  .then((response) => {
    success(response);
  })
  .catch(() => {
    fail();
  });
}
