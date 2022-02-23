import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PreSale from '../views/PreSale.vue'
import Farms from '../views/Farms.vue'
import Pools from '../views/Pools.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pre-sale',
    name: 'PreSale',
    component: PreSale
  },
  {
    path: '/farms',
    name: 'Farms',
    component: Farms
  },
  {
    path: '/pools',
    name: 'Pools',
    component: Pools
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
