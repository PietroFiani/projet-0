<template>
  <div>
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
            :key="delivery.id_department"
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
          :item-value="(item) => item.id_department"
          chips
          required
          label="Lieux de travail"
          multiple
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
        <v-card v-if="message" dark color="warning"> {{ message }}</v-card>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn icon class="ma-4">
          <v-icon v-if="!editMode" large color="primary" @click="edit()"
            >mdi-pen</v-icon
          >
        </v-btn>
        <v-btn icon class="ma-4">
          <v-icon v-if="!editMode" large color="warning" @click="dialog = true"
            >mdi-delete</v-icon
          >
        </v-btn>
        <v-btn icon class="ma-4">
          <v-icon v-if="editMode" large color="primary" @click="updateRunner"
            >mdi-check-bold</v-icon
          >
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline">
          Etes-vous surs de vouloir supprimer votre compte ?
        </v-card-title>
        <v-card-text
          >Toutes vos données seront définitivement supprimées.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Annuler
          </v-btn>
          <v-btn color="warning" text @click="remove()">
            Supprimer mon compte</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
    dialog: false,
    message: "",
    departments: [],
    newRunner: {
      mail: "",
      phone: "",
      password: "",
      repassword: "",
    },
  }),
  mounted() {
    this.newRunner = this.runner;
    this.newRunner.password = "";
    this.newRunner.repassword = "";
    (this.newRunner.departmentsIds = []),
      this.newRunner.deliveries.forEach((delivery) => {
        this.newRunner.departmentsIds.push(delivery.id_department);
      });
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
        .catch((error) => console.log("Departments error ", error));
    },
    remove() {
      let url = `http://localhost:5000/runners/${this.runner.id_runner}`;

      axios
        .delete(url)
        .then((response) => {
          console.log("Runner deleted", response.data);
          this.dialog = false;
          this.$emit("logout");
        }) //c'est un objet
        .catch((error) => console.log("error ", error));
    },
    updateRunner() {
      if (this.newRunner.password !== this.newRunner.repassword) {
        return (this.message = "Le mot de passe est invalide");
      }
      if (!this.newRunner.departmentsIds.length) {
        return (this.message =
          "Veuillez rentrer les départements dans lesquels vous travaillez");
      }
      this.$emit("update", this.runner);
      this.editMode = false;
    },
  },
};
</script>

<style>
</style>