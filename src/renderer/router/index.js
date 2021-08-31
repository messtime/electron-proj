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
      path: '/TheAddressbook',
      name: 'TheAddressbook-page',
      component: require('@/components/TheAddressbook').default
    },
    {
      path: '/record',
      name: 'record',
      component: require('@/components/record').default
    },
    
    {
      path: '/menu',
      name: 'menu',
      component: require('@/components/menu').default
    },
    {
      path: '/test',
      name: 'test',
      component: require('@/components/test').default
    },
    {
      path: '/month',
      name: 'month',
      component: require('@/components/month').default
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
      path: '/loan',
      name: 'loan',
      component: require('@/components/loan').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
