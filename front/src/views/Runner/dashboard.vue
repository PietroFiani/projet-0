<template>
  <div>
    <h1>COUCOU {{ runner.lastname }} {{ runner.firstname }}</h1>
    <v-btn @click="logout()"> Se deconnecter </v-btn>
    <v-row justify="center">
      <v-col cols="7">
        <v-card
          ><v-tabs grow v-model="tab" align-with-title>
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab class="ma-0"> Commande </v-tab>
            <v-tab> Produit </v-tab>
            <v-tab> Profil </v-tab>
            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card flat>
                  <v-card-text>mes commandes</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>produit</v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-profil :runner="runner"></v-profil>
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
export default {
  components: {
    VProfil,
  },
  data() {
    return {
      tab: null,
      runner: {},
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
    }
  },
  methods: {
    logout() {
      this.$store.commit("logoutRunner");
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>