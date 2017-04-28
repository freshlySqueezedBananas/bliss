import Vue from 'vue';
import store from '../../store';

const success = (response) => {
  let status = false;

  switch(response.status) {
    case 201:
      if (response.data) {
      }
    break;
  }
}

const fail = (error) => {
}

export default ({question, choice}) => {
  //todo
  let index =  _.findIndex(question.choices, (choice) => choice.choice == choice );

  _.each(question.choices, (choice) => {
    i.votes = 0;
  });

}
