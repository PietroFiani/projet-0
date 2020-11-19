<template>
  <div id="app">
    <v-app id="inspire">
      <v-form ref="form" v-model="valid" lazy-validation>
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
          required
        ></v-text-field>
        <v-btn color="error" class="mr-4" @click="log" x-large rounded> Connexion</v-btn>
      </v-form>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: false,
    object: {
      mail: "",
      password: "",
    },
    emailRules: [
      (v) => !!v || "E-mail requis",
      (v) => /.+@.+\..+/.test(v) || "E-mail non valid",
    ],
    required: [(v) => !!v || "Mot de passe requis"],
  }),

  methods: {
    log() {
      // const self=this
      let url = "http://localhost:5000/customers/login";
      this.$refs.form.validate();
      axios
        .get(url, {
          params: { mail: this.object.mail, password: this.object.password },
        })
        .then((response) => {
          if (response.data) {
            console.log("CONNECTE", response.data);
            this.$store.commit('idChange', response.data.id)
            // console.log(self.$store.state.customerId)
          } 
          else console.log("PAS CONNECTE");
        })
        .catch((error) => console.log("PAS CONNECTE", error));
      console.log(this.$store.state.customerId)

    },
  },
};
</script>

<style lang="scss" scoped>
</style>