<template>
  <v-app id="welobim">
    <v-navigation-drawer v-model="primaryDrawer.model" cliped absolute overflow app>
      <v-list dense>
        <v-list-tile v-for="item in primaryDrawer.items" :key="item.title" :to="item.route">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app absolute>
      <v-toolbar-side-icon @click.stop="primaryDrawer.model = !primaryDrawer.model">
      </v-toolbar-side-icon>
      <v-toolbar-title>_welobim</v-toolbar-title>
    </v-toolbar>
    <v-content color="defaultColor">
      <v-container fluid>
        <v-layout align-center justify-center>
            <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app>
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  import {mapActions} from 'vuex'
  import FormularioDeCarga from './components/FormularioDeCarga'
  import Empresas from './components/Empresas'
  import Logs from './components/Logs'

  export default {
    data: () => ({
      name: 'App',
      components: [
        FormularioDeCarga,
        Empresas,
        Logs,
      ],
      primaryDrawer: {
        model: null,
        items: [
          {title: 'Home', icon: 'dashboard', route: '/'},
          {title: 'Registro de Eventos', icon: 'description', route: '/Logs'},
          {title: 'Empresas', icon: 'business', route: '/Empresas/edit'},
          {title: 'Usuários', icon: 'people', route: '/Usuarios/edit'},
          {title: 'Carregar Arquivo', icon: 'cloud_upload', route: '/FormularioDeCarga'},
        ],
      },
    }),
    methods:{
      ...mapActions({
        setAppDefaultTheme: 'setAppDefaultTheme'
      })
    },
    created() {
      this.setAppDefaultTheme({color: 'grey lighten-5'})
    }
  }
</script>
