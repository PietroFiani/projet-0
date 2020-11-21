<template>
  <div>
    <h1>BIEN OU QUOI {{ customers[0].firstname }} {{ customers[0].lastname }}</h1>
    <v-btn color="primary" class="mr-4" @click="updateProfil()"> Modifier Profil</v-btn>
    <v-btn color="primary" class="mr-4" @click="addAddr()"> Ajouter un adresse de livraison</v-btn>


    <div v-for="customer of customers" :key="customer.id">
      <p> {{customer.road}} {{customer.zip}}  {{customer.nom}}</p>
      <v-btn color="primary" class="mr-4" @click="updateAddr(customer.idAddress)"> Modifier</v-btn>
      <v-btn color="error" class="mr-4" @click="deleteAddr(customer.idAddress)"> Supprimer</v-btn>

    </div>
    <v-btn @click="logout()"> Se deconnecter </v-btn>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      customers: [{
        firstname : "",
        lastname : ""
      }],
      id : null
    }
  },
  mounted() {
    if (!this.$store.state.customerId) {
      this.$router.push("/")
    } else {
      this.id = this.$store.state.customerId
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
    
    logout() {
      this.$store.commit("logoutCustomer")
      this.$router.push("/")
    },
    updateAddr(id) {
      this.$store.commit("addAddrCustomer", id)
      this.$router.push({ name: 'UpadteAddrClient'})
    },
    updateProfil() {
      this.$router.push({name: 'UpadteProfilClient'})
    },
    addAddr() {
      this.$router.push({name: 'AddAddrClient'})
    },
    deleteAddr(id) {
      axios({
            method: "DELETE",
            url: `http://localhost:5000/addrCustomers/${id}`,
            headers: { "Content-Type": "application/json" },
          }); 
    },
  },
}
</script>

<style>
</style>