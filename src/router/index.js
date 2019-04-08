import Vue from 'vue'
import Router from 'vue-router'
import FormularioDeCarga from '@/components/FormularioDeCarga'
import Home from '@/components/Home'
import Empresas from '@/components/Empresas'
import Usuarios from '@/components/Usuarios'
import Logs from '@/components/Logs'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/FormularioDeCarga',
      name: 'FormularioDeCarga',
      component: FormularioDeCarga
    },
    {
      path: '/Empresas/:mode',
      name: 'Empresas',
      component: Empresas,
      props: true
    },
    {
      path: '/Usuarios/:mode',
      name: 'Usuarios',
      component: Usuarios,
      props: true
    },
    {
      path: '/Logs/',
      name: 'Logs',
      component: Logs,
      props: true
    },
  ]
})
