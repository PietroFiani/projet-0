<template>
  <div>
    <h1>BIEN OU QUOI {{ customers[0].firstname }} {{ customers[0].lastname }}</h1>
    <v-btn color="primary" class="mr-4" @click="updateProfil()"> Modifier Profil</v-btn>
    <v-btn color="primary" class="mr-4" @click="addAddr()"> Ajouter un adresse de livraison</v-btn>


    <div v-for="customer of customers" :key="customer.id_address">
      <p> {{customer.road}} {{customer.zip}}  {{customer.nom}}</p>
      <v-btn color="primary" class="mr-4" @click="updateAddr(customer.id_address)"> Modifier</v-btn>
      <v-btn color="error" class="mr-4" @click="deleteAddr(customer.id_address)"> Supprimer</v-btn>
    </div>
    <v-card v-if="message" dark color="warning">
      <v-card-text>{{ message }}</v-card-text>
    </v-card>
    <v-btn @click="logout()"> Se deconnecter </v-btn>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      message: "",
      customers: [{
        firstname : "",
        lastname : ""
      }],
      id : null
    }
  },
  mounted() {
    // si l'utilisateur est pas connecté rentourne à l'accueil
    if (!this.$store.state.customerId) {
      this.$router.push("/")
    } else {
      this.id = this.$store.state.customerId
      // On recupere les info de l'utilisateur pour pouvoir les afficher
      let url = `http://localhost:5000/customers/${this.id}`
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            console.log("ADDRCUSTOMER", response.data)
            this.customers = response.data
          }
        })
        .catch((error) => {
          console.log("ERREUR", error)
        })
        
    }
    // this.findAddr()
  },
  methods: {
    // fonction de deconnexion
    logout() {
      this.$store.commit("logoutCustomer")
      this.$router.push("/")
    },
    // fonction pour update un adresse
    updateAddr(id) {
      this.$store.commit("addAddrCustomer", id)
      this.$router.push({ name: 'UpadteAddrClient'})
    },
    // fonction poour modifier le mail, le numero de tel et le password
    updateProfil() {
      this.$router.push({name: 'UpadteProfilClient'})
    },
    // fonction d'ajout d'adresse
    addAddr() {
      this.$router.push({name: 'AddAddrClient'})
    },
    // fonction de suppression d'addresse
    deleteAddr(id) {
      if (this.customers.length <= 1) {
        return (this.message = "Vous devez avoir on moins une adresse");
      }
      axios({
            method: "DELETE",
            url: `http://localhost:5000/addrCustomers/${id}`,
            headers: { "Content-Type": "application/json" },
          }); 
      // this.$router.push({name: 'Profil Client'})

    },
  },
}
</script>

<style>
</style>