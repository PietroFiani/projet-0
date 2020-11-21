<template>
  <div>
    <v-btn color="warning" @click="logout()"> Se deconnecter </v-btn>
    <v-img
      id="avatar"
      v-if="!runner.image"
      src="../../assets/avatar.png"
      width="200px"
    ></v-img>
    <v-row justify="center">
      <v-col cols="7" class="mt-16 pl-9">
        <h1>Bonjour, {{ runner.lastname }} {{ runner.firstname }}</h1></v-col
      >

      <v-col cols="7" class="mt-14">
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
                <v-profil :runner="runner" @update="update"></v-profil>
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
    update(newRunner) {
      console.log("New Runner", newRunner);
      let url = `http://localhost:5000/runners/${this.runner.id}`;
      axios
        .put(url, {
          id: this.runner.id,
          mail: newRunner.mail,
          phone: newRunner.phone,
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
          if (element == actualElement.idDepartment) found = true;
        });
        if (found == false) {
          axios({
            method: "DELETE",
            url: `http://localhost:5000/deliveries/${this.runner.id}`,
            headers: { "Content-Type": "application/json" },
          });
          axios
            .post("http://localhost:5000/deliveries/create", {
              runnerId: this.runner.id,
              departmentsIds: this.runner.departmentsIds,
            })
        }
      });
      this.$router.go()
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
</style>