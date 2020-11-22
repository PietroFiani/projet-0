<template>
  <div class="container">
    <v-form class="home-form" ref="form" v-model="valid" lazy-validation>
      <div class="text-area-wrapper">
        <v-text-field
          class="textarea"
          label="E-mail :"
          v-model="object.mail"
          :rules="emailRules"
          required
        >
        </v-text-field>
        <v-text-field
          class="textarea"
          label="Mot de passe"
          v-model="object.password"
          :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="() => (value = !value)"
          :type="value ? 'password' : 'text'"
          required
        >
        </v-text-field>
        <a href="" class="forgot-psw">mot de passe oublié ?</a>
      </div>
      <div class="btn-wrapper">
<<<<<<< HEAD
        <button class="round sign-in" @click="log">Connexion</button>
=======
        <button class="round sign-in" @click="log()">Connexion</button>
>>>>>>> customer-address
        <router-link :to="{ name: 'Inscription Client' }">
          <button class="round sign-up">Inscription</button>
        </router-link>
      </div>
      <div class="btn-wrapper">
<<<<<<< HEAD
        <router-link :to="{ name : 'Connexion Partenaire'}">
=======
        <router-link :to="{name :'Connexion Partenaire'}">
>>>>>>> customer-address
          <button class="round runner-sign-in">Connexion Runner</button>
        </router-link>
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
    if (this.$store.state.customerId) {
      this.$router.push("/client/profil");
    }
  },

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
            this.$store.commit('loginCustomer', response.data.id)
            this.$router.push("/client/profil");
          } 
          else { 
            console.log("PAS CONNECTE");
            this.message = "Email et/ou password invalide";
          
          }
        })
        .catch((error) => {
          console.log("PAS CONNECTE", error);
          this.message = "Email et/ou password invalide";
        })

    },
  },
};
</script>


<style lang="scss" scoped>
//Variables
$color1-btn: #FFAAAA;

.container {
  background-color: white;
<<<<<<< HEAD
  height: 60vh;
  width: 35em;
=======
  height: 70vh;
  width: 30em;
>>>>>>> customer-address
  border-radius: 25px;
  box-shadow: 0px 4px 4px 7px rgba(0, 0, 0, 0.1);
  z-index: 1;
  margin-top: 3vh;
  .home-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .btn-wrapper {
      display: flex;
      justify-content: space-around;
      margin-top: 3em;
    }
    .text-area-wrapper {
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
  height: 3em;
  border-radius: 50px;
  font-family: Monsserrat, sans-serif;
  transition: 300ms;
  outline: none;  
}
.sign-up {
  background-color: $color1-btn;
  border: 2px solid $color1-btn;
  color: white;
  width: 15em;
  transition: 200ms;
  &:hover {
    color: $color1-btn;
    background-color: white;
  }
}
.sign-in {
  border: solid 2px $color1-btn;
  color: $color1-btn;
  width: 15em;
  &:hover {
    color: white;
    background-color: $color1-btn;
  }
}
.runner-sign-in {
  border: solid 2px $color1-btn;
  color: $color1-btn;
  width: 32em;
  justify-self: center;
  margin-top: -1em;
  &:hover {
    color: white;
    background-color: $color1-btn;
  }
}
//textarea
.textarea {
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