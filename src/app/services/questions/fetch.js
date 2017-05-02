import Vue from 'vue';
import store from '../../store';

let all = true;
let mutator = '';

const success = (response) => {
  mutator = all ? 'setQuestions' : 'setQuestion';

  switch(response.status) {
    case 200:
      if (response.data) {
        store.dispatch(mutator, response.data);
      }
    break;
  }
}

const fail = (error) => {
  mutator = all ? 'setQuestion' : 'setQuestions';

  store.dispatch(mutator, {});
}

export default (questionId) => {
  if (questionId) {
    all = false;
  }

  const request = all
    ? '/questions?'+store.state.questions.limit+'&'+store.state.questions.offset+'&'+store.state.questions.filter
    : '/questions/'+questionId


  return Vue.$http.get('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com'+request)
    .then((response) => {
      success(response);
    })
    .catch((error) => {
      fail();
    });
}
