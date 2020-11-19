import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        customerId: null,
    },
    mutations: {
        logoutCustomer(state) {
            state.customerId = null;
          },
          loginCustomer(state, customerId) {
            state.customerId = customerId;
          },
          logoutRunner(state) {
            state.runnerId = null;
          },
          loginRunner(state, runnerId) {
            state.runnerId = runnerId;
          }
    },
    actions: {

    },
    modules: {},
    plugins: [createPersistedState()]
})