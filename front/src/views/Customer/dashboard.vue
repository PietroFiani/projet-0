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
    <div>
      <div v-for="runner of runners" :key="runner.id_runner">
        <div>
          <h1>Livreur</h1>
          <p> {{runner.lastname}} {{runner.firstname}} </p>
          <div v-for="product of runner.products" :key="product.id_product">
            <h2>Produit</h2>
            <p> {{product.name}} {{product.label}}</p>
            <p>stock: {{product.stock}} kg</p>
            <p>prix: {{product.price}} €/g</p>
            <v-btn color="primary" class="mr-4" @click="commander()"> Commander</v-btn>

          </div>
          
        </div>
      </div>
    </div>
    
    <v-dialog
      v-model="dialog" persistent max-width="1000">
      <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-dialog>
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
      id : null,
      id_department: 1,
      runners: [],
      dialog: false
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
            this.search()
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
    search() {
      let url = `http://localhost:5000/runners/from/${this.customers[0].id_department}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            console.log("RUNNERs", response.data);
            this.runners = response.data;
          }
        })
        .catch((error) => {
          console.log("ERREUR", error);
        });
    },
    commander() {
      this.dialog = true
    }
  },
}
</script>

<style>
</style>