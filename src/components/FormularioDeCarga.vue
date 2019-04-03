<template>
  <div>
    <h1 class="display-3">Carga de Dados</h1>
    <div>
      <v-btn color="success" @click="$refs.arquivoCSV.click()">
        <v-icon>cloud_upload</v-icon>
        Upload
      </v-btn>
      <input v-show="false" name="arquivoCSV" ref="arquivoCSV" type="file"
             @change="carregarArquivoCSV($event.target.files)" accept="text/csv">
    </div>
  </div>
</template>

<script>
  import converter from 'json-2-csv'

  export default {
    name: "FormularioDeCarga",
    computed: {},
    methods: {
      carregarArquivoCSV(files) {
        console.log(files);
        let fileContent = '';
        if (files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = () => {
            fileContent = reader.result;
            this.converterCSVparaJSON(fileContent);
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
        })
      }
    },
  }
</script>

<style scoped>

</style>
