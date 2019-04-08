<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Registro de Ações</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <v-data-table :headers="headers" :items="logs" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-left">{{ props.item.action }}</td>
        <td class="text-xs-right">{{ props.item.event_name }}</td>
        <td class="text-xs-left">{{ props.item.date_time }}</td>
        <td class="text-xs-left">{{ props.item.user }}</td>
        <td class="text-xs-left">{{ props.item.company }}</td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="fetchLogs()">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'

  export default {
    props: {
      company: {
        type: Number,
        default: 0,
      }
    },
    data: () => ({
      headers: [
        {text: 'Id', align: "left", sortable: false, value: 'id'},
        {text: 'Action', align: "left", sortable: false, value: 'action'},
        {text: 'Event', align: "left", sortable: false, value: 'event_name'},
        {text: 'Date', align: "left", sortable: false, value: 'date_time'},
        {text: 'User', align: "left", sortable: false, value: 'user'},
        {text: 'Company', align: "left", sortable: false, value: 'company'},
      ],
    }),
    computed: {
      ...mapState({
        companies: state => state.company.companies,
        users: state => state.user.users,
      }),
      ...mapGetters({
        logs: 'logs',
      }),
    },
    created() {
      this.fetchCompanies().then(() => {
        return this.fetchUsers()
      }).then(() => {
        return this.fetchLogs();
      }).then(() =>{

      });

    },
    methods: {
      ...mapActions({
        fetchUsers: 'fetchUser',
        fetchCompanies: 'fetchCompany',
        fetchLogs: 'fetchLogs',
      }),
    }
  }
</script>

<style scoped>

</style>
