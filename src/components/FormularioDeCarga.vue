<template>
  <v-card elevation="0" :color="appColor">
    <v-card-actions>
      <v-btn :loading="loading" :disabled="loading" color="blue-grey" class="white--text"
             @click="$refs.arquivoCSV.click()">
        Upload
        <v-icon right dark>cloud_upload</v-icon>
      </v-btn>
      <input v-show="false" name="arquivoCSV" ref="arquivoCSV" type="file"
             @change="carregarArquivoCSV($event.target.files)" accept="text/csv">
    </v-card-actions>
  </v-card>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import converter from 'json-2-csv'

  export default {
    name: "FormularioDeCarga",
    computed: {
      ...mapGetters({
        appColor: 'appColor'
      }),
    },
    data() {
      return {
        loading: false,
        items: null,
      }
    },
    methods: {
      carregarArquivoCSV(files) {
        this.loading = true;
        console.log(files);
        let fileContent = '';
        if (files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = () => {
            fileContent = reader.result;
            this.converterCSVparaJSON(fileContent);
            this.loading = false;
          };
          reader.readAsText(file);
        }
      },
      converterCSVparaJSON(csv) {
        converter.csv2json(csv, (err, json) => {
          if (err) throw err;
          console.log(typeof json);
          console.log(json.length);
          console.log(json);
          this.items = json
        })
      }
    },
  }
</script>

<style scoped>

</style>
