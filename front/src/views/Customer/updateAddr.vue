<template>
  <div>
      <h1>Modifie l'adresse poto</h1>
      <v-text-field
          v-model="address.road"
          label="Rue"
          
        ></v-text-field>
        <v-text-field
          v-model="address.zip"
          label="Code postal"
          
        ></v-text-field>
         <v-autocomplete
              v-model="address.idDepartment"
              :items="departments"
              :item-text="(item) => item.code + ' - ' + item.nom"
              :item-value="(item) => item.id"
              chips
              label="Departement"
              
            ></v-autocomplete>
      <v-btn color="primary" class="mr-4" @click="update()"> Modifier</v-btn>

  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      address: {},
      id : null,
      departments: [],
      required: [(v) => !!v || "requis"],
      object: {
        departmentsId: "",
        road: "",
        zip: ""
      },
    }
    
  },
  mounted() {
     this.id = this.$store.state.addrCustomerId
      let url = `http://localhost:5000/addrCustomer/${this.id}`
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            // console.log("Address", response.data)
            this.address = response.data

          }
        })
        .catch((error) => {
          console.log("ERREUR", error)
        })
      url = "http://localhost:5000/departments";
      axios
        .get(url)
        .then((response) => {
          // console.log("Departements", response.data);
          this.departments = response.data;
        }) //c'est un objet
        .catch((error) => console.log(console.log("Departments error ", error)));
  },
  methods: {
    update() {
      let url = `http://localhost:5000/addrCustomer/${this.id}`
      console.log(url)
      axios
        .put(url, {
          road: this.address.road,
          zip: this.address.zip,
          idDepartment: this.address.idDepartment,
        })
        .then((response) => {
          if (response.data) {
            console.log("Address", response.data)
            this.address = response.data
          }
        })
        .catch((error) => {
          console.log("ERREUR", error)
        })
      this.$store.commit("removeAddrCustomer")
      this.$router.push("/client/profil")
    }
  }
}
</script>

<style>

</style>