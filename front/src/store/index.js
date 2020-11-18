import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        customerId: null,
    },
    mutations: {
        idChange(state, payload) {
            state.customerId = payload
        }
    },
    actions: {

    },
    modules: {},
    plugins: [createPersistedState()]
})