<template>
  <div class="container">
    <v-form class="home-form" ref="form" v-model="valid" lazy-validation>
      <div class="text-field-wrapper">
            <v-text-field 
            class="text-field"
              v-model="object.mail"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
            <v-text-field 
            class="text-field"
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
            <v-btn color="primary" class="mt-4 zizi" @click="log" x-large rounded>Connexion</v-btn>
      </div>
    </v-form>
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
//Variables
$color1-btn: #6FCE91;

.container {
  background-color: white;
  height: 60vh;
  width: 35em;
  border-radius: 25px;
  box-shadow: 0px 4px 4px 7px rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin-top: 3vh;
  .home-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .text-field-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-top: 1em;
      margin-left: 2em;
      margin-right: 2em;
    }
  }
}
//buttons
.round {
  font-size: 1.5em;
  height: 2em;
  border-radius: 50px;
  font-family: Monsserrat, sans-serif;
  transition: 300ms;
  outline: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.sign-in {
  border: solid 2px $color1-btn;
  color: $color1-btn;
  width: 10em;
  &:hover {
    color: white;
    background-color: $color1-btn;
  }
}
//textarea
.text-field {
  width: 38em;
  height: 6em;
}
.forgot-psw {
  color: $color1-btn;
  &:hover {
    color: rgb(70, 70, 236);
  }
}
</style>

