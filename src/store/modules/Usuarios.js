import backendAPI from '@/api/backendAPI';

function extractUserPayload({user, company}){
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    company_id: company.id,
    companyName: company.name,
  }
}

function extractPayload(payload){
  return Array.isArray(payload)? payload.map(p => extractUserPayload(p)):extractUserPayload(payload);
}

function fillPayload(user){
  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    },
    company: user.company_id,
  }
}

export default {
  state: {
    users: [],
    endpoint: 'users',
    OPTIONS: {
      LIST: '/',
      DETAIL: '/?id/',
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
  },
  actions: {
    addUser({state, commit, dispatch, getters}, data) {
      commit('setBackendURL', {endpoint: state.endpoint, option:state.OPTIONS.LIST}, {root: true});
      dispatch('add', fillPayload(data)).then( (response) =>{
        data.id = response.user.id;
        data.companyName = getters.companies[data.company_id].nome;
        commit('addUser', data);
        dispatch('fetchUser');
      });

    },
    deleteUser({state, commit, dispatch}, data) {
      commit('setBackendURL', {endpoint: state.endpoint, option:state.OPTIONS.DETAIL}, {root: true});
      dispatch('delete', data).then((success) =>{
        commit('deleteUser', data);
      }).catch( (error) =>{});
    },
    fetchUser({state, commit, dispatch}) {
      commit('setBackendURL', {endpoint: state.endpoint, option:state.OPTIONS.LIST}, {root: true});
      dispatch('fetch').then( (payload) =>{
        console.log(payload);
        commit('setUsers', extractPayload(payload));
      });
    },
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    addUser(state, user) {
      state.users.push(user);
    },
    deleteUser(state, user) {
      state.users = state.users.filter(u => u.id !== user.id);
    },
  }
}
