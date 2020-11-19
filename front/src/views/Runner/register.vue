<template>
  <div id="app">
    <v-app id="inspire"
      ><v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="center">
          <v-col cols="11" lg="4">
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
              v-model="object.password"
              :rules="required"
              label="Mot de passe"
              required
              :append-icon="value1 ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="() => (value1 = !value1)"
              :type="value1 ? 'password' : 'text'"
            ></v-text-field>
          </v-col>
          <v-col cols="11" lg="4">
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
              v-model="object.repassword"
              :rules="required"
              label="Confirmation mot de passe"
              required
              :append-icon="value2 ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="() => (value2 = !value2)"
              :type="value2 ? 'password' : 'text'"
            ></v-text-field>
          </v-col>
          <v-col cols="11" lg="8">
            <v-autocomplete
              v-model="object.departmentsIds"
              :items="departments"
              :item-text="(item) => item.code + ' - ' + item.nom"
              :item-value="(item) => item.id"
              chips
              :rules="required"
              required
              label="Lieux de travail"
              multiple
            ></v-autocomplete>
          </v-col>
          <v-col cols="11" align="center">
            <v-card v-if="message" dark color="warning"
              ><v-card-text>{{ message }}</v-card-text></v-card
            >
            <v-btn rounded color="primary" class="mr-4" @click="register">
              Inscription</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: false,
    value1: String,
    value2: String,
    object: {
      mail: "",
      password: "",
      repassword: "",
      phone: "",
      firstname: "",
      lastname: "",
      image: "",
      departmentsIds: [],
    },
    message: "",
    departments: [],
    emailRules: [
      (v) => !!v || "E-mail requis",
      (v) => /.+@.+\..+/.test(v) || "E-mail non valid",
    ],
    required: [(v) => !!v || "requis"],
  }),
  mounted() {
    if (this.$store.state.runnerId) {
      this.$router.push("/partenaire/profil");
    }
    let url = "http://localhost:5000/departments";
    axios
      .get(url)
      .then((response) => {
        // console.log("Departements", response.data);
        this.departments = response.data;
      }) //c'est un objet
      .catch((error) => console.log(console.log("Departments error ", error)));
  },

  methods: {
    register() {
      let url = "http://localhost:5000/runners/register";
      if (this.object.password != this.object.repassword) {
        return (this.message = "Le mot de passe est invalide");
      }
      if (this.$refs.form.validate()) {
        axios
          .post(url, {
            mail: this.object.mail,
            password: this.object.password,
            phone: this.object.phone,
            firstname: this.object.firstname,
            lastname: this.object.lastname,
            image: this.object.image,
            departmentsIds: this.object.departmentsIds,
          })
          .then((response) => {
            console.log("INSCRIT", response.data);
            this.$store.commit("loginRunner", response.data.id);
            this.$router.push("/partenaire/profil");
          }) //c'est un objet
          .catch((error) => {
            console.log("PAS INSCRIT", error);
            this.message = "Vous etes déjà inscrit !";
          });
      }
    },
  },
};
</script>

<style>
</style>