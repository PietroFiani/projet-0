<template>
  <div class="container">
      <v-form class="home-form">
          <div class="text-area-wrapper">
            <v-text-field class="textarea" label="email :" v-model="object.mail" :rules="emailRules" required>
            </v-text-field>
            <v-text-field class="textarea" type="password" label="mot de passe :" v-model="object.password" :counter="10" :rules="required" required>
            </v-text-field>
            <a href="" class="forgot-psw">mot de passe oublié ?</a>
          </div>
          <div class="btn-wrapper">
            <button class="round sign-in" @click="log">Connexion</button>
            <router-link :to="{ name: 'Register'}">
                <button class="round sign-up"> Inscription</button>
            </router-link>
          </div>
          <div class="btn-wrapper">
              <button class="round runner-sign-in">Connexion Runner</button>
          </div>
      </v-form>
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
      let url = "http://localhost:5000/customers/login";
      this.$refs.form.validate();
      axios
        .get(url, {
          params: { mail: this.object.mail, password: this.object.password },
        })
        .then((response) => {
          if (response.data) console.log("CONNECTE", response.data);
          else console.log("PAS CONNECTE");
        })
        .catch((error) => console.log("PAS CONNECTE", error));
    },
  },
};
</script>


<style lang="scss" scoped>

//Variables
$green:#1EAD0B; 
$purple:#470063; 

.container{
    background-color: white;
    height: 60vh;
    width: 30em;
    border-radius: 25px;
    box-shadow: 0px 4px 4px 7px rgba(0, 0, 0, 0.1);
    z-index: 1;
    margin-top:5vh;
    .home-form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        .btn-wrapper{
            display: flex;
            justify-content: space-around;
            margin-top: 3em;
        }
        .text-area-wrapper{
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
 .round{
    height: 2.2em;
    border-radius: 50px;
    font-family: Rubik, sans-serif;
    margin:0.2em; 
    transition: 300ms;
    outline: none;
}
.sign-up{
    background-color: $green;
    border: 2px solid $green;
    color: white;
    width: 16em;
    transition: 200ms;
    &:hover{
       color:$green;
       background-color: white;
    }
}
.sign-in{
    border: solid 2px $green;
    color: $green;
    width: 16em; 
     &:hover{
       color:white;
       background-color:$green;
    }
}
.runner-sign-in{
    border: solid 2px $purple; 
    color: $purple;
    width: 23em;
    justify-self: center;
    margin-top: -1em; 
    &:hover{
    color:white;
    background-color:$purple;
    }
}
//textarea
.textarea{
    width: 34em;
}
.forgot-psw{
    color: $purple;
    &:hover{
        color:rgb(70, 70, 236); 
    }
}

</style>