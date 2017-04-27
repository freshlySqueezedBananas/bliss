export default {
  props: ['health'],
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/views/questions/index/index.vue')
    },
    {
      path: '/questions',
      name: 'questions',
      component: require('@/views/questions/index/index.vue')
    },
    {
      path: '/questions/:id',
      name: 'question',
      component: require('@/views/question/index/index.vue'),
      props: true,
    }
  ]
}
