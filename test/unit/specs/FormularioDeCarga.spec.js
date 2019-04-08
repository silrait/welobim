import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import FormularioDeCarga from '@/components/FormularioDeCarga.vue';

describe('FormularioDeCarga', () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);

    wrapper = mount(FormularioDeCarga, {
      localVue: localVue
    });
  });

  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<h1 class="display-3">Carga de Dados</h1>')
  });

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('v-btn')).toBe(true);
  });
})
