import backendAPI from '@/api/backendAPI';

export default {
  state: {
    companies: [],
    endpoint: 'companies',
    OPTIONS: {
      LIST: '/',
      DETAIL: '/?id/',
      ALLEVENTS: '/?id/events/',
      EVENTS20DAYS: '/?id/actions/',
    },
  },
  getters: {
    companies(state) {
      return state.companies;
    },
    CompaniesToSelect(state){
      return state.companies.map( c => {
        return {value: c.id, text: c.name}
      })
    }
  },
  actions: {
    addCompany({state, commit, dispatch}, data) {
      commit('setBackendURL', {endpoint: state.endpoint, option:state.OPTIONS.LIST}, {root: true});
      dispatch('add', data).then( (response) =>{
        data.id = response.id;
        commit('addCompany', data);
        dispatch('fetchCompany');
      });

    },
    deleteCompnay({state, commit, dispatch}, data) {
      commit('setBackendURL', {endpoint: state.endpoint, option:state.OPTIONS.DETAIL}, {root: true});
      dispatch('delete', data).then((success) =>{
        commit('deleteCompany', data);
      }).catch( (error) =>{});
    },
    fetchCompany({state, commit, dispatch}) {
      commit('setBackendURL', {endpoint: state.endpoint, option:state.OPTIONS.LIST}, {root: true});
      dispatch('fetch').then( (payload) =>{
        commit('setCompanies', payload);
      });
    },
  },
  mutations: {
    setCompanies(state, companies) {
      state.companies = companies;
    },
    addCompany(state, company) {
      state.companies.push(company);
    },
    deleteCompany(state, company) {
      state.companies = state.companies.filter(comp => comp.id !== company.id);
    },
  }
}
