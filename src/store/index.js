import Vue from 'vue'
import Vuex from 'vuex'

import questions from './modules/questions'
import connection from './modules/connection'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    questions,
    connection
  },
  strict: false,
})