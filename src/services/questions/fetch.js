import Vue from 'vue';
import store from '../../store';
const success = (response) => {
  let status = false;

  switch(response.status) {
    case 200:
      if (response.data) {
        status = true;
      }
    break;
  }

  store.dispatch('setQuestion', response.data);
}

const fail = (error) => {
  store.dispatch('setQuestion', {});
}

export default (questionId) => {

  return Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/'+questionId)
    .then((response) => {
      success(response);
    })
    .catch((error) => {
      fail();
    });
}
