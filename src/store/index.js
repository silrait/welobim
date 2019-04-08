import Vuex from 'vuex'
import Vue from 'vue'
import backendAPI from '@/api/backendAPI'
import company from './modules/Empresas'
import user from './modules/Usuarios'
import log from './modules/Logs'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    company,
    user,
    log,
  },
  state: {
    backend: {
      baseURL: 'http://127.0.0.1:8000/',
      defaultUrl: {  endpoint: '', option: '', },
      url: {  endpoint: '', option: '', },
    },
    theme: {
      color: '',
    },
    apiStatus: {
      success: false,
      message: '',
    }
  },
  getters: {
    apiError(state){
      return !state.apiStatus.success;
    },
    apiMessage(state) {
      return state.apiStatus.message;
    },
    appColor(state) {
      return state.theme.color;
    },
    urlBuilder(state){
      return `${state.backend.baseURL}${state.backend.url.endpoint}${state.backend.url.option}`;
    },
  },
  actions: {
    setAppDefaultTheme(context, theme) {
      context.commit('setTheme', theme)
    },
    add({state, commit, getters}, data) {
      let url = getters.urlBuilder;
      return new Promise((resolver, reject) => {
        backendAPI.post(data, url, ({success, responseData, error}) => {
          state.apiStatus.success = success;
          state.apiStatus.message = error;
          commit('clearBackendURL');
          (success)? resolver(responseData) : reject(error);
        });
      });
    },
    delete({state, commit, getters}, data) {
      if(!confirm('Are you sure you want to delete this item?'))
        return;

      let url = getters.urlBuilder;
      url = url.replace('?id', data.id);

      return new Promise((resolver, reject) => {
        backendAPI.delete(data, url, ({success, error}) => {
          state.apiStatus.success = success;
          state.apiStatus.message = error;
          commit('clearBackendURL');
          (success)? resolver(success) : reject(error);
        });
      });
    },
    fetch({commit, getters}) {
      let url = getters.urlBuilder;
      return new Promise((resolver, reject) => {
        backendAPI.get(url, payload => {
          commit('clearBackendURL');
          (payload)? resolver(payload) : reject();
        });
      });
    },
  },
  mutations: {
    setBackendURL(state, url){
      state.backend.url = url;
    },
    clearBackendURL(state){
      state.backend.url = state.backend.defaultUrl;
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
  }
});
