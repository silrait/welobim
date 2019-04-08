<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Lista de Empresas</v-toolbar-title>
      <v-divider class="mx-2" inset vertical ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-if="mode === 'edit'" v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn v-if="mode === 'edit'" color="primary" dark class="mb-2" v-on="on">Nova Empresa</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Nova Empresa</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Nome da Empresa"></v-text-field>
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
    <v-data-table :headers="headers" :items="companies" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
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
  import {mapActions, mapState} from 'vuex'

  export default {
    props : {
      mode : {
        type: String,
        default: 'display'
      }
    },
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Id', align: "left", sortable: false, value:'id'},
        { text: 'Company Name', align: "left", sortable: false, value:'name'},
      ],
      editedItem: { id: 0, name: '' },
      defaultItem: { id: 0, name: '' },
    }),
    computed: {
      ...mapState({
        companies: state => state.company.companies
      }),
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    created () {
      this.fetchUsers();
    },
    methods: {
      ...mapActions({
        deleteItem: 'deleteCompany',
        addItem: 'addCompany',
        fetchUsers: 'fetchCompany',
      }),
      close () {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
        }, 300)
      },
      deleteItem(item){
        console.log(item);
        this.deleteUser(item);
      },
      save () {
        this.addItem(this.editedItem);
        this.close();
      }
    }
  }
</script>

<style scoped>

</style>
