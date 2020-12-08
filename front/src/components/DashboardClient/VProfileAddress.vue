<template>
  
  
  <div class="addr_container">
    
    
    <h1>Mes adresses</h1>  
    <v-btn color="primary" class="mr-4" @click="add(),dialog=true" >
            Ajouter une adresse</v-btn>
    <!-- Début du v-for -->
    <div
      class="addresses-container"
      v-for="customer of customers"
      :key="customer.id_address"
    >
      <p>{{ customer.road }} {{ customer.zip }} {{ customer.nom }}</p>
      <!-- <v-btn
        color="error"
        class="mr-4"
        @click="deleteAddr(customer.id_address)"
      >
        Supprimer</v-btn
      > -->
      <v-btn color="primary" class="mr-4" @click="updateAddr(customer),dialog=true" > Modifier </v-btn>

      <v-dialog v-if="dialog" class="update-form" v-model="dialog"  max-width="1000">
    
        <v-card>
          <v-app-bar color="secondary" dark>
            Edition du profil
            <v-spacer />
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon></v-btn
            >
          </v-app-bar>
          <v-card-text>

            <v-text-field v-model="address.road" label="Rue"></v-text-field>
            <v-text-field
              v-model="address.zip"
              label="Code postal"
            ></v-text-field>
            <v-autocomplete
              v-model="address.id_department"
              :items="departments"
              :item-text="(item) => item.code + ' - ' + item.nom"
              :item-value="(item) => item.id_department"
              chips
              label="Departement"
            ></v-autocomplete>
          <v-btn color="primary" class="mr-4" @click="update(),dialog=false" >
            Modifier</v-btn
          >
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  
  
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dialog:false, 
      dialog1:false, 
      valid: false,
      address: {},
      message: "",
      departments: [],
      customers: [
        {
          firstname: "",
          lastname: "",
        },
      ],
      id: null,
      id_department: 1,
      required: [(v) => !!v || "requis"],
    };
  },
  mounted() {
    // si l'utilisateur est pas connecté rentourne à l'accueil
    this.id = this.$store.state.customerId;
    // On recupere les info de l'utilisateur pour pouvoir les afficher
    this.loadCustomer()
    this.getDepartments()

    
  },

  methods: {
    loadCustomer() {
      let url = `http://localhost:5000/customers/${this.id}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            // console.log("Customer", response.data)
            this.customers = response.data;
            // this.search();
          }
        })
        .catch((error) => {
          console.log("ERREUR", error);
        });
    },
    getDepartments() {
      let  url = "http://localhost:5000/departments";
      axios
        .get(url)
        .then((response) => {
          // console.log("Departements", response.data);
          this.departments = response.data;
        }) //c'est un objet
        .catch((error) => console.log(("Departments error ", error)));
    },
    // fonction de deconnexion
    logout() {
      this.$store.commit("logoutCustomer");
      this.$router.push("/");
    },
    // fonction pour update un adresse
    update() {
      let url = `http://localhost:5000/addrCustomer/${this.address.id_address}`;
      // console.log(url);
      axios
        .put(url, {
          road: this.address.road,
          zip: this.address.zip,
          id_department: this.address.id_department,
        })
        .then((response) => {
          if (response.data) {
            // console.log("Address", response.data)
            this.address = response.data;
        this.loadCustomer()

          }
        })
        .catch((error) => {
          console.log("ERREUR", error);
        });
      this.$store.commit("removeAddrCustomer");
      // document.location.reload(); 
    },
    updateAddr(customer) {
      this.address = customer
    },
    // fonction poour modifier le mail, le numero de tel et le password
    updateProfil() {
      this.$router.push({ name: "UpadteProfilClient" });
    },
    // fonction d'ajout d'adresse
    addAddr() {
      this.$router.push({ name: "AddAddrClient" });
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
      this.reloadAddr();
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
