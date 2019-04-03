import Vue from 'vue'
import Router from 'vue-router'
import FormularioDeCarga from '@/components/FormularioDeCarga'

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'FormularioDeCarga',
      component: FormularioDeCarga
    }
  ]
})
