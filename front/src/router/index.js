import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/client/connexion',
    name: 'Log In',
    component: () => import(/* webpackChunkName: "authCustomer" */ '../views/Customer/authentification.vue')
  },
  {
    path: '/client/inscription',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Customer/register.vue')
  },
  {
    path: '/partenaire/connexion',
    name: 'Log In',
    component: () => import(/* webpackChunkName: "authentification" */ '../views/Runner/authentification.vue')
  },
  {
    path: '/partenaire/inscription',
    name: 'RunnerRegister',
    component: () => import(/* webpackChunkName: "register" */ '../views/Runner/register.vue')
  },
  {
    path: '/partenaire/profil',
    name: 'RunnerDashboard',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Runner/dashboard.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
