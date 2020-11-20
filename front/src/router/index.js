import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/client/connexion',
        name: 'Connexion Client',
        component: () =>
            import ( /* webpackChunkName: "authCustomer" */ '../views/Customer/authentification.vue')
    },
    {
        path: '/client/inscription',
        name: 'Inscription Client',
        component: () =>
            import ( /* webpackChunkName: "register" */ '../views/Customer/register.vue')
    },
    {
        path: '/client/profil',
        name: 'Profil Client',
        component: () =>
            import ( /* webpackChunkName: "profile" */ '../views/Customer/dashboard.vue')
    },
    {
        path: '/client/modifier/adresse',
        name: 'UpadteAddrClient',
        component: () =>
            import ( /* webpackChunkName: "profile" */ '../views/Customer/updateAddr.vue')
    },
    {
        path: '/client/modifier/profil',
        name: 'UpadteProfilClient',
        component: () =>
            import ( /* webpackChunkName: "profile" */ '../views/Customer/updateProfil.vue')
    },
    {
        path: '/partenaire/connexion',
        name: 'Connexion Partenaire',
        component: () =>
            import ( /* webpackChunkName: "authentification" */ '../views/Runner/authentification.vue')
    },
    {
        path: '/partenaire/inscription',
        name: 'Inscription Partenaire',
        component: () =>
            import ( /* webpackChunkName: "register" */ '../views/Runner/register.vue')
    },
    {
        path: '/partenaire/profil',
        name: 'Profil Partenaire',
        component: () =>
            import ( /* webpackChunkName: "profile" */ '../views/Runner/dashboard.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router