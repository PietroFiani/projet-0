import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Team from '../views/Runner/Team.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
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
        path: '/client/ajouter/adresse',
        name: 'AddAddrClient',
        component: () =>
            import ( /* webpackChunkName: "profile" */ '../views/Customer/addAddress.vue')
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
    }, 
    {
        path :'/test_upload', 
        name :'Test Upload Photo', 
        component: () => 
        import ('../views/testUpload.vue')
    },

    
    {
        path: '/partenaire/profil/stock',
        name: 'Stock',
        component: () =>
        import ('../views/Runner/Stock.vue')
    },
    {
        path: '/partenaire/profil/commande',
        name: 'Commande',
        component: () => 
        import ('../views/Runner/Commande.vue')
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/partenaire/profil/vente',
        name: 'Mes ventes',
        component: Team
    },
    {
        path: '/partenaire/profil/profil',
        name: 'Profil',
        component: () => 
        import ('../views/Runner/VProfil.vue')
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router