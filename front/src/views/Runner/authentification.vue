<template>
  <div id="app">
    <v-app id="inspire">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="center">
          <v-col cols="12" lg="3" md="8" align="center">
            <v-text-field
              v-model="object.mail"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="object.password"
              :counter="10"
              :rules="required"
              label="Mot de passe"
              :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
              required
            ></v-text-field>

            <v-card dark color="warning"
              ><v-card-text v-if="message">{{ message }}</v-card-text></v-card
            >
            <v-btn color="primary" class="mt-4" @click="log" x-large rounded>
              Connexion</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: false,
    value: String,
    message: "",
    object: {
      mail: "",
      password: "",
    },
    emailRules: [
      (v) => !!v || "E-mail requis",
      (v) => /.+@.+\..+/.test(v) || "E-mail non valide",
    ],
    required: [(v) => !!v || "Mot de passe requis"],
  }),

  mounted() {
    if (this.$store.state.runnerId) {
      this.$router.push("/partenaire/profil");
    }
  },
  methods: {
    log() {
      let url = "http://localhost:5000/runners/login";
      this.$refs.form.validate();
      axios
        .get(url, {
          params: { mail: this.object.mail, password: this.object.password },
        })
        .then((response) => {
          if (response.data) {
            console.log("CONNECTE", response.data);
            this.$store.commit("loginRunner", response.data.id_runner);
            this.$router.push("/partenaire/profil");
          } else {
            console.log("PAS CONNECTE");
            this.message = "Email et/ou password invalide";
          }
        })
        .catch((error) => {
          console.log("PAS CONNECTE", error);
          this.message = "Email et/ou password invalide";
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>