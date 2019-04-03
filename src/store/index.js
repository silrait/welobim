import Vuex from 'vuex'
import Vue from 'vue'
import csv from './modules/csv'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    csv,
  },
  state: {},
  getters: {},
  actions: {},
  mutations: {}
});
