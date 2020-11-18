<template>
  <div id="app">
    <v-app id="inspire">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="object.firstname"
          :rules="required"
          label="Prénom"
          required
        ></v-text-field>
        <v-text-field
          v-model="object.lastname"
          :rules="required"
          label="Nom"
          required
        ></v-text-field>
        <v-text-field
          v-model="object.phone"
          :rules="required"
          label="Téléphone"
          required
        ></v-text-field>

        <v-text-field
          v-model="object.mail"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="object.password"
          :counter="10"
          :rules="required"
          label="Mot de passe"
          required
        ></v-text-field>
        <v-btn color="error" class="mr-4" @click="register"> Inscription</v-btn>
      </v-form>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: false,
    object: {
      mail: "",
      password: "",
      phone: "",
      firstname: "",
      lastname: "",
      image : ""
    },
    emailRules: [
      (v) => !!v || "E-mail requis",
      (v) => /.+@.+\..+/.test(v) || "E-mail non valid",
    ],
    required: [(v) => !!v || "requis"],
  }),

  methods: {
    register() {
      let url = "http://localhost:5000/runners/register";
      this.$refs.form.validate();
      axios
        .post(url, {
          mail: this.object.mail,
          password: this.object.password,
          phone: this.object.phone,
          firstname: this.object.firstname,
          lastname: this.object.lastname,
          image: this.object.image
        })
        .then((response) => console.log("INSCRIT", response)) //c'est un objet
        .catch((error) => console.log(console.log("PAS INSCRIT", error)));
    },
  },
};
</script>

<style>
</style>