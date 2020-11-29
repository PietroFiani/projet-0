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
          :rules="PhoneRules"
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
              :rules="required"
              label="Mot de passe"
              required
              :append-icon="value1 ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="() => (value1 = !value1)"
              :type="value1 ? 'password' : 'text'"
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
        <v-text-field
          v-model="object.road"
          :rules="required"
          label="Rue"
          required
        ></v-text-field>
        <v-text-field
          v-model="object.zip"
          :rules="codePostalRules"
          label="Code postal"
          required
        ></v-text-field>
         <v-autocomplete
              v-model="object.departmentsId"
              :items="departments"
              :item-text="(item) => item.code + ' - ' + item.nom"
              :item-value="(item) => item.id_department"
              chips
              :rules="required"
              required
              label="Departement"
              
            ></v-autocomplete>
            <v-card v-if="message" dark color="warning"
              ><v-card-text>{{ message }}</v-card-text>
            </v-card>
        <v-btn color="error" class="mr-4" @click="register"> Inscription</v-btn>
      </v-form>
    </v-app>
  </div>
</template>

<script>
import axios from "axios"

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
      departmentsId: "",
      road: "",
      zip: ""
    },
    message: "",
    departments: [],
    PhoneRules:[
      (v) => /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/.test(v)|| "Numéro incorrect"
    ],
    emailRules: [
      (v) => !!v || "E-mail requis",
      (v) => /.+@.+\..+/.test(v) || "E-mail non valide",
    ],
    codePostalRules:[
      (v) => /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(v) || "Code Postal Valide", 
    ], 
    required: [(v) => !!v || "requis"],
  }),
  mounted() {
    //Verifie si l'utilisateur est deja log 
    if (this.$store.state.custopmerId) {
      // this.$router.push("/client/profil")
      console.log('already Log')
    }
    // recupere la liste des departements
    let url = "http://localhost:5000/departments"
    axios
      .get(url)
      .then((response) => {
        // console.log("Departements", response.data)
        this.departments = response.data
      }) //c'est un objet
      .catch((error) => console.log(console.log("Departments error ", error)))
  },

  methods: {
    // inscrit un utilisateur, stocke la variable global, redirige vers le dashboard
    register() {
      // Verfiie si les password sont identiques
      if (this.object.password != this.object.repassword) {
        return (this.message = "Le mot de passe est invalide");
      }
      // fait appel a l'api pour enregistrer un user
      let url = "http://localhost:5000/customers/register"
      if (this.$refs.form.validate()) {
        axios
          .post(url, {
            mail: this.object.mail,
            password: this.object.password,
            phone: this.object.phone,
            firstname: this.object.firstname,
            lastname: this.object.lastname,
            image: this.object.image,
            id_department: this.object.departmentsId,
            road: this.object.road,
            zip: this.object.zip
          })
          .then((response) => {
            console.log("INSCRIT", response)
            // this.$store.commit("loginCustomer", response.data.id)
            this.$router.push("/client/profil")
          }) //c'est un objet
          .catch((error) =>{
            console.log("PAS INSCRIT", error)
            this.message = "Vous etes déjà inscrit !"
          })
      }
    },
  },
}
</script>

<style>
</style>