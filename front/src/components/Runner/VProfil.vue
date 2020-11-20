<template>
  <v-card flat>
    <v-card-text class="pa-16">
      <h2>{{ runner.lastname }} {{ runner.firstname }}</h2>

      <v-text-field
        v-model="newRunner.mail"
        label="E-mail"
        :disabled="!editMode"
      ></v-text-field>
      <v-text-field
        v-model="newRunner.phone"
        label="Téléphone"
        :disabled="!editMode"
      ></v-text-field>
      <span v-if="!editMode">
        Lieux de travail :
        <v-chip
          v-for="delivery in runner.deliveries"
          :key="delivery.idDepartment"
          class="ma-2"
        >
          {{ delivery.code }} - {{ delivery.nom }}
        </v-chip></span
      >
      <v-autocomplete
        v-else
        v-model="newRunner.departmentsIds"
        :items="departments"
        :item-text="(item) => item.code + ' - ' + item.nom"
        :item-value="(item) => item.id"
        chips
        required
        label="Lieux de travail"
        multiple
        :value="runner.deliveries"
      ></v-autocomplete>
      <v-text-field
        v-if="editMode"
        v-model="newRunner.password"
        label="Nouveau mot de passe"
        :append-icon="value1 ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (value1 = !value1)"
        :type="value1 ? 'password' : 'text'"
      ></v-text-field>
      <v-text-field
        v-if="editMode"
        v-model="newRunner.repassword"
        label="Confirmation du mot de passe"
        :append-icon="value2 ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="() => (value2 = !value2)"
        :type="value2 ? 'password' : 'text'"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon class="ma-2">
        <v-icon v-if="!editMode" large color="primary" @click="edit()"
          >mdi-pen</v-icon
        >
      </v-btn>
      <v-btn icon class="ma-2">
        <v-icon v-if="!editMode" large color="warning">mdi-delete</v-icon>
      </v-btn>
      <v-btn icon class="ma-2">
        <v-icon v-if="editMode" large color="primary" @click="updateRunner"
          >mdi-check-bold</v-icon
        >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  props: {
    runner: {},
  },
  data: () => ({
    value1: String,
    value2: String,
    editMode: false,
    departments: [],
    newRunner: {
      mail: "",
      phone: "",
      departmentsIds: [],
    },
  }),
  mounted() {
    this.newRunner = this.runner;
    this.newRunner.password=""
  },
  methods: {
    edit() {
      let url = "http://localhost:5000/departments";
      axios
        .get(url)
        .then((response) => {
          console.log("Departements", response.data);
          this.departments = response.data;
          this.editMode = true;
        }) //c'est un objet
        .catch((error) =>
          console.log(console.log("Departments error ", error))
        );
    },
    updateRunner() {
      this.$emit("update", this.runner);
      this.editMode = false;
    },
  },
};
</script>

<style>
</style>