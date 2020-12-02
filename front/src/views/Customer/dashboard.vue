<template>
  <div>
    <h1>BIEN OU QUOI {{ customers[0].firstname }} {{ customers[0].lastname }}</h1>
    <v-btn color="primary" class="mr-4" @click="updateProfil()"> Modifier Profil</v-btn>
    <v-btn color="primary" class="mr-4" @click="addAddr()"> Ajouter un adresse de livraison</v-btn>

    <v-header></v-header>

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
          <div v-if="runner.products.length > 0">
            <h1>Livreur</h1>
            <p> {{runner.lastname}} {{runner.firstname}} </p>
            <h2>Produit</h2>
          </div>
          <div v-for="product of runner.products" :key="product.id_product">
            <p> {{product.name}} {{product.label}}</p>
            <p>stock: {{product.stock}} g</p>
            <p>prix: {{product.price}} €/g</p>
            <v-btn color="primary" class="mr-4" @click="commander(product, runner.id_runner)"> Commander</v-btn>

          </div>
          
        </div>
      </div>
    </div>
    
    <v-dialog
      v-model="dialog" persistent max-width="1000">
      <v-card>
        <v-app-bar  color="secondary" dark>
          Commander du {{ commande.name_product}}
          <v-spacer />
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon></v-btn
          >
        </v-app-bar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>

           <v-select
            v-model="commande.id_address"
            label="Adresse de livraison"
            required
            :items="customers"
            :item-text="(item) => item.road + ' ' + item.zip + ' ' + item.nom"
            :item-value="(item) => item.id_address"
            ></v-select>
           <v-text-field
            v-model="commande.quantity"
            :label="'Quantité (' + commande.max_quantity + ')'" 
            required
            type="number"
            min="0"
            :max="commande.max_quantity"
            ></v-text-field>
            <p>
              Prix : <span v-if="commande.quantity">{{ commande.prix = commande.quantity * commande.prix_init}} €</span>
            </p>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="orderPruduct()">
            commander</v-btn>
        </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-btn @click="logout()"> Se deconnecter </v-btn>
  </div>
</template>

<script>
import axios from "axios"
import VHeader from '../../components/Iencli/VHeader.vue'

export default {
  name: "dashboard",
  components : {
    VHeader
  }, 

  data() {
    return {
      valid: false,

      message: "",
      customers: [{
        firstname : "",
        lastname : ""
      }],
      commande: [{
        id_runner: "",
        id_address: "",
        id_product: "",
        date: null,
        quantity: null,
        prix: null,
        max_quantity:"",
        name_product:"",
        prix_init: "",
      }],
      id : null,
      id_department: 1,
      runners: [],
      dialog: false,
      // required: [(v) => !!v || "requis"],
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
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1 
    let yyyy = today.getFullYear()
    let hh = today.getHours()
    let m = today.getMinutes()
    let ss = today.getSeconds()
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    }
    if(hh<10) {
        hh='0'+hh
    } 
    if(m<10) {
        m='0'+m
    }
    if(ss<10) {
        ss='0'+ss
    } 
    this.commande.date = yyyy+'-'+mm+'-'+dd+' '+hh+':'+m+':'+ss
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
        return (this.message = "Vous devez avoir on moins une adresse")
      }
      axios({
            method: "DELETE",
            url: `http://localhost:5000/addrCustomers/${id}`,
            headers: { "Content-Type": "application/json" },
          }) 
      // this.$router.push({name: 'Profil Client'})

    },
    search() {
      let url = `http://localhost:5000/runners/from/${this.customers[0].id_department}`
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            console.log("RUNNERs", response.data)
            this.runners = response.data
          }
        })
        .catch((error) => {
          console.log("ERREUR", error)
        })
    },
    commander(produit , runner) {
      this.commande.name_product = produit.label
      this.commande.id_product = produit.id_product
      this.commande.max_quantity = produit.stock
      this.commande.prix_init = produit.price
      this.commande.id_runner = runner
      this.dialog = true
    },
    orderPruduct() {

      console.log(this.commande)
      console.log(this.$store.state.customerId)
      let url = "http://localhost:5000/orders/add"
      if (this.$refs.form.validate()) {
        axios
          .post(url, {
            id_runner: this.commande.id_runner, 
            id_customer: this.$store.state.customerId,
            id_address: this.commande.id_address, 
            id_product: this.commande.id_product, 
            date: this.commande.date, 
            workflow: 'En attente',
            qtte: this.commande.quantity, 
            prix: this.commande.prix 
          })
          .then((response) => {
            console.log("COMMANDE", response)
            //faire une fonction reload
          }) 
          .catch((error) =>{
            console.log("PAS COMMANDE", error)
            this.message = "bug commande"
          })
      }

      url = `http://localhost:5000/productsOrder/${this.commande.id_product}`
      axios
        .put(url, {
          id: this.commande.id_product,
          stock: this.commande.quantity,
        })
        .then((response) => {
          if (response.data) {
            console.log("PRODUCT ", response.data)
            // this.address = response.data
          }
        })
        .catch((error) => {
          console.log("ERREUR", error)
        })
    }
  },
}
</script>

<style>
</style>