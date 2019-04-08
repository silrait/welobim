<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Lista de Usuarios</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-if="mode === 'edit'" v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn v-if="mode === 'edit'" color="primary" dark class="mb-2" v-on="on">Nova Usuario</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Nova Usuario</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                  <v-text-field v-model="editedItem.password"
                                :append-icon="config.showPassword ? 'visibility' : 'visibility_off'"
                                :type="config.showPassword ? 'text' : 'password'"
                                label="Password"
                                counter
                                @click:append="config.showPassword = !config.showPassword">
                  </v-text-field>
                  <v-text-field v-model="editedItem.email" label="e-mail" :rules="[config.email]"></v-text-field>
                  <v-select v-model="editedItem.company_id" :items="CompaniesToSelect" label="Empresa"></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.username }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.companyName }}</td>
        <td v-if="mode === 'edit'" class="justify-center layout px-0">
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchUsers()">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'

  export default {
    props: {
      mode: {
        type: String,
        default: 'display'
      }
    },
    data: () => ({
      dialog: false,
      headers: [
        {text: 'Id', align: "left", sortable: false, value: 'id'},
        {text: 'Username', align: "left", sortable: false, value: 'username'},
        {text: 'Email', align: "left", sortable: false, value: 'email'},
        {text: 'Company', align: "left", sortable: false, value: 'CompanyName'},
      ],
      config: {
        showPassword: false,
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        }
      },
      editedItem: {id: 0, username: '', password: '', email: '', company_id: 0, companyName: ''},
      defaultItem: {id: 0, username: '', password: '', email: '', company_id: 0, companyName: ''},
    }),
    computed: {
      ...mapState({
        companies: state => state.company.companies,
        users: state => state.user.users
      }),
      ...mapGetters({
        CompaniesToSelect: 'CompaniesToSelect',
      })
    },
    watch: {
      dialog(val) {
        val || this.close()
      }
    },
    created() {
      this.fetchCompanies().then(() => {
        return this.fetchUsers();
      });
    },
    methods: {
      ...mapActions({
        deleteUser: 'deleteUser',
        addItem: 'addUser',
        fetchUsers: 'fetchUser',
        fetchCompanies: 'fetchCompany',
      }),
      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
        }, 300)
      },
      deleteItem(item) {
        console.log(item);
        this.deleteUser(item);
      },
      save() {
        this.addItem(this.editedItem);
        this.close();
      }
    }
  }
</script>

<style scoped>

</style>
