<template>
  <div id="welobim">
    <v-app>
        <v-container grid-list-md fluid>
          <v-layout row wrap>
            <v-flex md2>
              <FloatingDrawer class="d-inline-flex"></FloatingDrawer>
            </v-flex>
            <v-flex md10>
              <v-content>
                  <router-view></router-view>
              </v-content>
            </v-flex>
          </v-layout>
        </v-container>
        <v-footer app></v-footer>
    </v-app>
  </div>
</template>

<script>
  import FloatingDrawer from './components/FloatingDrawer'
  export default {
    name: 'App',
    components : {
      FloatingDrawer,
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
