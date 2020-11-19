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
        <v-text-field
          v-model="object.road"
          :rules="required"
          label="Rue"
          required
        ></v-text-field>
        <v-text-field
          v-model="object.zip"
          :rules="required"
          label="Code postal"
          required
        ></v-text-field>
         <v-autocomplete
              v-model="object.departmentsIds"
              :items="departments"
              :item-text="(item) => item.code + ' - ' + item.nom"
              :item-value="(item) => item.id"
              chips
              :rules="required"
              required
              label="Departement"
              
            ></v-autocomplete>
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
      image: "",
      departmentsIds: [],
      road: "",
      zip: ""
    },
    departments: [],
    emailRules: [
      (v) => !!v || "E-mail requis",
      (v) => /.+@.+\..+/.test(v) || "E-mail non valid",
    ],
    required: [(v) => !!v || "requis"],
  }),
  mounted() {
    if (this.$store.state.custopmerId) {
      // this.$router.push("/client/profil");
      console.log('already Log')
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
      let url = "http://localhost:5000/customers/register";
      this.$refs.form.validate();
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
          console.log("INSCRIT", response)
          this.$store.commit("loginCustomer", response.data.id)
          this.$router.push("/client/profil")
        }) //c'est un objet
        .catch((error) =>{
          console.log("PAS INSCRIT", error);
          this.message = "Vous etes déjà inscrit !";
        })
    },
  },
};
</script>

<style>
</style>