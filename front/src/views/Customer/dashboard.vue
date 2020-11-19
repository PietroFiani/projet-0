<template>
  <div>
    <h1>COUCOU {{ customer.lastname }} {{ customer.firstname }}</h1>
    <v-btn @click="logout()"> Se deconnecter </v-btn>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      customer: {},
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
            console.log("CUSTOMER", response.data)
            this.customer = response.data
          }
        })
        .catch((error) => {
          console.log("ERREUR", error)
        })
        
    }
    this.findAddr()
  },
  methods: {
    findAddr() {
      let url = `http://localhost:5000/customerLocation/${this.id}`
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            console.log("Location", response.data)
            this.location = response.data
          }
        })
        .catch((error) => {
          console.log("ERREUR ", error)
        })
    },
    logout() {
      this.$store.commit("logoutCustomer")
      this.$router.push("/")
    },
  },
}
</script>

<style>
</style>