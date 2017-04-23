import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  props: ['health'],
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/pages/questions/index/index.vue')
    },
    {
      path: '/questions',
      name: 'questions',
      component: require('@/pages/questions/index/index.vue')
    },
    {
      path: '/questions/:id',
      name: 'question',
      component: require('@/pages/question/index/index.vue'),
      props: true,
    }
  ]
})
