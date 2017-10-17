import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Animals from '@/components/Animals'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'List',
    component: List
  }, {
    path: '/animaux',
    name: 'Animal',
    component: Animals
  }]
})
