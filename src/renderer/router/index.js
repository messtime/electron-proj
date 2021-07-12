import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/page1',
      name: 'page1',
      component: require('@/components/page1').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
