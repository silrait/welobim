import backendAPI from '@/api/backendAPI';

export default {
  state: {
    logs: [],
    endpoint: 'logs',
    OPTIONS: {
      LIST: '/',
      EVENT: '/most_accessed_event/',
      USER: '/most_active_user/',
    },
  },
  getters: {
    logs(state) {
      return state.logs;
    }
  },
  actions: {
    addLog({state, commit, dispatch, getters}, data) {
      commit('setBackendURL', {endpoint: state.endpoint, option:state.OPTIONS.LIST}, {root: true});
      dispatch('add', data).then( (response) =>{
        data.id = response.id;
        data.companyname = getters.companies[data.company].name;
        data.username = getters.users[data.user].username;
        commit('addLog', data);
        dispatch('fetchLog');
      });

    },
    fetchLogs({state, commit, dispatch}) {
      commit('setBackendURL', {endpoint: state.endpoint, option:state.OPTIONS.LIST}, {root: true});
      dispatch('fetch').then( (payload) =>{
        commit('setLogs', payload);
      });
    },
  },
  mutations: {
    setLogs(state, logs) {
      state.logs = logs;
    },
    addLog(state, log) {
      state.logs.push(log);
    },
  }
}
