<template>
    <div class="profile-container">
      <h1>Mon Profil</h1>
      <table class="profile">
        <tr>
          <td>Prénom : {{customers[0].firstname}}</td>
          <td>Nom : {{customers[0].lastname}} </td>
        </tr>
        <tr>E-mail : {{customers[0].mail}}</tr>
        <tr>Nom : {{customers[0].lastname}}</tr>
      </table>
      
      <v-btn color="primary" class="mr-4" @click="updateProfil()"> Modifier Profil</v-btn>
      <v-dialog v-model="dialog"  max-width="1000">
        <v-card>
          <v-app-bar color="secondary" dark>
            Edition du profil
            <v-spacer />
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon></v-btn
            >
          </v-app-bar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>

              <v-text-field
                v-model="customers[0].phone"
                :rules="PhoneRules"
                label="Téléphone"
                
              ></v-text-field>
              <v-text-field
                v-model="customers[0].mail"
                :rules="emailRules"
                label="E-mail"
              ></v-text-field>
              <v-text-field
                v-model="object.password"
                label="Mot de passe"
                
                :append-icon="value1 ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (value1 = !value1)"
                :type="value1 ? 'password' : 'text'"
              ></v-text-field>
              <v-text-field
                v-model="object.repassword"
                label="Confirmation mot de passe"
                
                :append-icon="value2 ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="() => (value2 = !value2)"
                :type="value2 ? 'password' : 'text'"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="update()">
              Modifier</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import axios from "axios"
export default { 
    
  data() {
    return {
      valid: false,
      value1: String,
      value2: String,
      dialog: false,
      message: "",
      customers: [{
        firstname : "",
        lastname : ""
      }],
      object: {
            password: null,
            repassword: null,
        },
      id : null,
      id_department: 1,
      required: [(v) => !!v || "requis"],
      PhoneRules:[
        (v) => /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/.test(v)|| "Numéro incorrect"
      ],
      emailRules: [
        (v) => !!v || "E-mail requis",
        (v) => /.+@.+\..+/.test(v) || "E-mail non valid",
      ],
    }
  },
  mounted() {
    // si l'utilisateur est pas connecté rentourne à l'accueil
      this.id = this.$store.state.customerId
      // On recupere les info de l'utilisateur pour pouvoir les afficher
      this.getProfil()
        
    },
  methods: {
    getProfil() {
      let url = `http://localhost:5000/customers/${this.id}`
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            // console.log("ADDRCUSTOMER", response.data)
            this.customers = response.data
          }
        })
        .catch((error) => {
          console.log("ERREUR", error)
        })
    },
    // fonction de deconnexion
    logout() {
      this.$store.commit("logoutCustomer")
      this.$router.push("/")
    },
    // fonction poour modifier le mail, le numero de tel et le password
    updateProfil() {
      // this.$router.push({name: 'UpadteProfilClient'})
      this.dialog = true
    },
    update() {
      // verifie les password
      if (this.object.password != this.object.repassword) {
        return (this.message = "Le mot de passe est invalide");
      }
      let url = `http://localhost:5000/customers/${this.id}`
      if (this.$refs.form.validate()) {
        if (this.object.password) {
          axios
            .put(url, {
                mail: this.customers[0].mail,
                phone: this.customers[0].phone,
                password: this.object.password,
            })
            .then((response) => {
            if (response.data) {
                // console.log("customer", response.data)
                this.customers = response.data
            }
            })
            .catch((error) => {
            console.log("ERREUR", error)
            })
        } else {
          axios
            .put(url, {
                mail: this.customers[0].mail,
                phone: this.customers[0].phone,
            })
            .then((response) => {
            if (response.data) {
                // console.log("customer", response.data)
                this.customers = response.data
            }
            })
            .catch((error) => {
            console.log("ERREUR", error)
            })
        }
        
      }
    },
  },
}
</script>