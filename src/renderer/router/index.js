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
      path: '/',
      name: 'login',
      component: require('@/components/login').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
