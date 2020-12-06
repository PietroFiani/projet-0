<template>
  <div
    style="
      background: linear-gradient(180deg, #9bc9ff 0%, #515bae 100%);
      height: 100%;
    "
  >
    <v-flex xs12 offset-xs10 class="mt-10">
      <v-menu offset-y min-width="230">
        <template v-slot:activator="{ on, attrs }">
          <v-row>
            <v-btn v-bind="attrs" rounded v-on="on" x-large class="arrow-btn" width="230">
              <img
                width="50"
                height="50"
                class="profil-pic"
                src="../../assets/avatar.png"
                alt="photo de profil"
              />
              <h2 class="client-name">
                {{ runner.lastname }}
                {{ runner.firstname }}
              </h2>

              <v-img
                width="20"
                height="20"
                class="arrow mb-2"
                src="../../assets/flechenavigation.svg"
                alt="fleche de découverte du menu"
              />
            </v-btn>
          </v-row>
        </template>
        <v-list>
          <v-list-item
            ><v-btn text class="link" @click="logout()"
              >Se deconnecter</v-btn
            ></v-list-item
          >
        </v-list>
      </v-menu>
    </v-flex>
    <!-- <v-img
      id="avatar"
      v-if="!runner.image"
      src="../../assets/avatar.png"
      width="200px"
    ></v-img> -->
    <v-row justify="center">
      <v-col cols="12" lg="10" md="10" class="mt-14">
        <v-card height="750" style="border-radius: 25px"
          ><v-tabs grow v-model="tab" align-with-title>
            <v-tabs-slider></v-tabs-slider>
            <v-tab class="ma-0"> Commande </v-tab>
            <v-tab> Produit </v-tab>
            <v-tab> Profil </v-tab>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-order :orders="runner.orders"></v-order>
              </v-tab-item>
              <v-tab-item>
                <v-product :products="products" @reload="reload()"></v-product>
              </v-tab-item>
              <v-tab-item>
                <v-profil
                  :runner="runner"
                  @update="update"
                  @logout="logout"
                ></v-profil>
              </v-tab-item>
            </v-tabs-items> </v-tabs
        ></v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import VProfil from "../../components/Runner/VProfil";
import VProduct from "../../components/Runner/VProduct";
import VOrder from "../../components/Runner/VOrder";
export default {
  components: {
    VProfil,
    VProduct,
    VOrder,
  },
  data() {
    return {
      tab: null,
      runner: {},
      products: [],
    };
  },
  mounted() {
    const moment = require("moment");
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
            this.runner.orders.forEach((order) => {
              order.name = order.lastname + " " + order.firstname;
              order.date = moment(order.date).format("DD/MM/YYYY");
            });
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
      console.log("reload");
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
          } else this.products = [];
        })
        .catch((error) => {
          console.log("ERREUR", error);
        });
      console.log("reload ended");
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
        console.log(element);
        axios({
          method: "DELETE",
          url: `http://localhost:5000/deliveries/${this.runner.id_runner}`,
          headers: { "Content-Type": "application/json" },
        }).then(() => {
          axios
            .post("http://localhost:5000/deliveries/create", {
              id_runner: this.runner.id_runner,
              departmentsIds: this.runner.departmentsIds,
            })
            .then(() => {
              this.reload();
            });
        });
      });
    },
  },
};
</script>

<style scoped>
body {
}
#avatar {
  position: absolute;
  left: 11%;
  top: 8%;
  z-index: 5;
}
/* button {
  position: absolute;
  right: 2%;
  top: 3%;
} */
.scroll {
  overflow-y: scroll;
}
.v-menu__content {
  border-radius:50px;
}
</style>