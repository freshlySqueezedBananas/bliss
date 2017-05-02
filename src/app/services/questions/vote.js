import Vue from 'vue'
import store from '../../store'
import _ from 'lodash'

export default (choice) => {
  const id = store.state.questions.question.id
  let question = JSON.parse(JSON.stringify(store.state.questions.question))
  let index =  _.findIndex(question.choices, (o) => o.choice == choice )

  question.choices[index].votes++;

  let questionStripped = JSON.parse(JSON.stringify(store.state.questions.question))

  _.each(questionStripped.choices, (i, index) => {
    questionStripped.choices[index].votes = i.choice === choice ? 1 : 0
  })

  return Vue.$http.put('https://private-bbbe9-blissrecruitmentapi.apiary-mock.com/questions/'+id, questionStripped)
    .then(() => store.dispatch('setQuestion', question))
}
