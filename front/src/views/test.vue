<template>
  <div>
    <v-text-field
      v-model="id_department"
      label="ID du département"
      required
      type="number"
    ></v-text-field>
    <v-btn @click="search">Rechercher :</v-btn>
    {{runners}}
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      id_department: 1,
      runners: [],
    };
  },
  methods: {
    search() {
      let url = `http://localhost:5000/runners/from/${this.id_department}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            console.log("RUNNERs", response.data);
            this.runners = response.data;
          }
        })
        .catch((error) => {
          console.log("ERREUR", error);
        });
    },
  },
};
</script>

<style>
</style>