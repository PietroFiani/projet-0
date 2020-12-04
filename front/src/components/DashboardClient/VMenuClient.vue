<template>
  <div class="container">
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <div class="overview">
            <img
              class="profil-pic"
              src="../../assets/avatar.png"
              alt="photo de profil"
            />
            <h2 class="client-name">
              {{ customers[0].firstname }} <br />
              {{ customers[0].lastname }}
            </h2>
            <button v-bind="attrs" v-on="on" class="arrow-btn">
              <img
                class="arrow"
                src="../../assets/flechenavigation.svg"
                alt="fleche de découverte du menu"
              />
            </button>
          </div>
        </template>

        <v-list-item>
          <v-list-item
            ><router-link class="link" :to="{ name: 'Dashboard Client' }"
              ><span class="link">Accueil</span></router-link
            ></v-list-item
          >
          <v-list-item>
            <router-link class="link" :to="{ name: 'Client Profile' }"
              ><span class="link">Profile</span></router-link
            ></v-list-item
          >
          <v-list-item
            ><router-link class="link" :to="{ name: 'Commandes Client' }"
              ><span class="link">Historique des commandes</span></router-link
            ></v-list-item
          >
          <v-list-item
            ><span class="link" @click="logout()"
              >Se deconnecter</span
            ></v-list-item
          >
        </v-list-item>
      </v-menu>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "",
      customers: [
        {
          firstname: "",
          lastname: "",
        },
      ],
      id: null,
    };
  },
  mounted() {
    // si l'utilisateur est pas connecté rentourne à l'accueil
    if (!this.$store.state.customerId) {
      this.$router.push("/");
    } else {
      this.id = this.$store.state.customerId;
      // On recupere les info de l'utilisateur pour pouvoir les afficher
      let url = `http://localhost:5000/customers/${this.id}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            console.log("ADDRCUSTOMER", response.data);
            this.customers = response.data;
            this.search();
          }
        })
        .catch((error) => {
          console.log("ERREUR", error);
        });
    }

    // this.findAddr()
  },
  methods: {
    // fonction de deconnexion
    logout() {
      this.$store.commit("logoutCustomer");
      this.$router.push("/");
    },
    search() {
      let url = `http://localhost:5000/runners/from/${this.customers[0].id_department}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            // console.log("RUNNERs", response.data)
            this.runners = response.data;
          }
        })
        .catch((error) => {
          console.log("ERREUR", error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 10em;
//containers architecture
.container {
  width: 0px;
  padding: 0px;
  background-color: red;
  border-radius: 50px;
  .overview {
    z-index: 1;
    position: absolute;
    width: 11em;
    height: 3em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: blue;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;

  }
}
.v-menu__content {
  position: absolute;
  top: 1000px;
  width: 11em;
  height: 18em;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  .v-list-item {
    display: flex;
    flex-direction: column;
    height: 20px;
  }
}

//overview

.profil-pic {
  height: 3em;
}
.client-name {
  height: 3em;
  font-size: 2em;
}
.client-name {
  color: white;
  font-size: 1em;
}
.arrow-btn{
  outline: none;
  .arrow {
  padding-right: 0.5em;
  height: 2em;
  }
}

//menu

.link {
  margin-top: 1em;
}
</style>
