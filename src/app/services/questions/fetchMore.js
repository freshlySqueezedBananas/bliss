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

  store.dispatch('addQuestions', response.data);
}

const fail = (error) => {
  store.dispatch('addQuestions', {});
}

export default () => {

  return Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions?'+store.state.questions.limit+'&'+store.state.questions.offset+'&'+store.state.questions.filter)
    .then((response) => {
      success(response);
    })
    .catch((error) => {
      fail();
    });
}
