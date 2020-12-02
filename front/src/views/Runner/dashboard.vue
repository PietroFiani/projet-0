<template>
  <div>
    <VToolbar>
    </VToolbar >
    <v-btn fab dark large color="warning" @click="logout()" >
      <v-icon dark>mdi-power</v-icon>
    </v-btn>
    
    <v-row justify="left">
      <v-col cols="12" class="mt-6 pl-9">
      <h1>Bonjour, {{ runner.lastname }} {{ runner.firstname }}</h1>
      </v-col
      >
    <VMargeNavigation>
    </VMargeNavigation>

      <div class="test">
        <v-tabs height="700" weigth="450" vertical class="Navi">
      <div class="sous-test">
      <v-tab>
        <v-icon left>
          mdi-package-variant
        </v-icon>
        Stock
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-run
        </v-icon>
        livraison
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        Profil
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-chart-line
        </v-icon>
        Vente/Benefice
      </v-tab>
      </div>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-flex xs12="xs12">
            <h1 class="display-1 mb-1">Approvisionement</h1>
          </v-flex>
            <v-product :products="products" @reload="reload()"></v-product>
            <VStock></VStock>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <VLivraison></VLivraison>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-profil
            :runner="runner"
            @update="update"
            @logout="logout"
          ></v-profil>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-flex xs12="xs12">
          <h1 class="display-1 mb-1">Chiffre annuelle</h1>
        </v-flex>
      </v-tab-item>
    </v-tabs>
     </div>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import VProfil from "../../components/Runner/VProfil";
import VProduct from "../../components/Runner/VProduct";
import VToolbar from "../../components/Runner/VToolbar";
import VLivraison from "../../components/Runner/VLivraison";
import VStock from "../../components/Runner/VStock";
export default {
  components: {
    VProfil,
    VProduct,
    VToolbar,
    VLivraison,
    VStock,
  },
  data() {
    return {
      tab: null,
      runner: {},
      products: [],
    };
  },
  mounted() {
    if (!this.$store.state.runnerId) {
      this.$router.push("/");
    } else {
      let id = this.$store.state.runnerId;
      let url = `http://localhost:5000/runners/${id}`;
      axios
        .get(url)
        .then((response) => {
          if (response.data) {
            console.log("RUNNER", response.data);
            this.runner = response.data;
          }
        })
        .catch((error) => {
          console.log("ERREUR", error);
        });
      let url2 = `http://localhost:5000/products/${this.$store.state.runnerId}`;
      axios
        .get(url2)
        .then((response) => {
          if (response.data) {
            console.log("Products", response.data);
            this.products = response.data;
          }
        })
        .catch((error) => {
          console.log("ERREUR", error);
        });
    }
  },
  methods: {
    logout() {
      this.$store.commit("logoutRunner");
      this.$router.push("/");
    },
    reload() {
      let url2 = `http://localhost:5000/products/${this.$store.state.runnerId}`;
      axios
        .get(url2)
        .then((response) => {
          if (response.data) {
            console.log("Products", response.data);
            this.products = response.data;
          }
        })
        .catch((error) => {
          console.log("ERREUR", error);
        });
    },
    update(newRunner) {
      console.log("New Runner", newRunner);
      let url = `http://localhost:5000/runners/${this.runner.id_runner}`;
      axios
        .put(url, {
          id_runner: this.runner.id_runner,
          mail: newRunner.mail,
          phone: newRunner.phone,
          password: newRunner.password,
        })
        .then((response) => {
          console.log("Runner updated", response.data);
        }) //c'est un objet
        .catch((error) => {
          console.log("erreur", error);
        });

      newRunner.departmentsIds.forEach((element) => {
        let found = false;
        this.runner.deliveries.forEach((actualElement) => {
          if (element == actualElement.id_department) found = true;
        });
        if (found == false) {
          axios({
            method: "DELETE",
            url: `http://localhost:5000/deliveries/${this.runner.id_runner}`,
            headers: { "Content-Type": "application/json" },
          });
          axios.post("http://localhost:5000/deliveries/create", {
            id_runner: this.runner.id_runner,
            departmentsIds: this.runner.departmentsIds,
          });
        }
      });
      this.$router.go();
    },
  },
};
</script>

<style scoped>
#avatar {
  position: absolute;
  left: 11%;
  top: 8%;
  z-index: 5;
}
button {
  position: absolute;
  right: 2%;
  top: 3%;
}
.scroll {
   margin: right;
}

.v-slide-group__wrapper {
  background: blue;
}

.v-application--is-ltr theme--light {
    background-color: green;
}
</style>