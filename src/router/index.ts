import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: () => import('../components/HelloWorld.vue')
    // },
    {
      path: '/',
      name: 'index',
      component: () => import('../pages/index/index.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../pages/index/index.vue')
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../pages/help/help.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login/login.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('../pages/detail/detail.vue')
    }
  ]
})
