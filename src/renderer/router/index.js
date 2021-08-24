import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'hash',
  routes: [
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/page1',
      name: 'page1',
      component: require('@/components/page1').default
    },
    {
      path: '/step2',
      name: 'step2',
      component: require('@/components/step2').default
    },
    {
      path: '/step3',
      name: 'step3',
      component: require('@/components/step3').default
    },
    {
      path: '/',
      name: 'login',
      component: require('@/components/login').default
    },
    {
      path: '/overview',
      name: 'overview',
      component: require('@/components/overview').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
