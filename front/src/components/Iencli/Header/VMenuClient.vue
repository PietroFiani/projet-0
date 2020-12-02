<template>
  <div class="container">
    <div class="overview">
      <img
        class="profil-pic"
        src="../../../assets/avatar.png"
        alt="photo de profil"
      />
      <h2 class="client-name">
        {{ customers[0].firstname }} <br />
        {{ customers[0].lastname }}
      </h2>
      <button>
        <img class="arrow" src="../../../assets/flechenavigation.svg" alt="fleche de découverte du menu"/>
      </button>
    </div>

    <div class="menu">
      <div class="link-container">
        <router-link  class="link" :to="{ name: 'Profil Client' }"><span class="link">Profil</span></router-link>
        <router-link  class="link" :to="{ name: 'Commandes Client' }"><span class="link">Historique des commandes</span></router-link>
        <span class="link" @click="logout()">Se deconnecter</span>
      </div>
    </div>
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
            // this.search()
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
  },
}
</script>

<style lang="scss" scoped>
$width:10em; 
//containers architecture
.container{
  width:0px; 
    padding: 0px;
    background-color: red;
    border-radius: 50px;
    .overview{
        z-index: 1;
        position: absolute;
        width:11em;
        height: 3em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: blue;
        border-radius: 50px;

    }
    .menu{ 
        position: absolute;
        width:11em;
        height: 14em;
        padding: 2em 1em 0 1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: green; 
        border-radius:25px; 
        .link-container{
            display: flex;
            flex-direction: column;
            background-color: aqua;
        }
    }
}

//overview

.profil-pic{
    height: 3em;
}
.client-name{
    height: 3em;
    font-size: 2em;
}
.client-name{
  color:white;
  font-size: 1em;
}
.arrow{
  padding-right: 0.5em;
  height: 2em;
}
//menu

.link{
  margin-top: 1em;
}
</style>