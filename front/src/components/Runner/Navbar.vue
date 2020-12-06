<template>
   <nav>
       <v-app-bar color="blue-grey darken-2" dark app >
           <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
           <v-img class="logo" max-height="130" max-width="50" src="../../assets/logoBlanc.svg"/>
           <v-toolbar-title class="text-uppercase ">
               <span class="font-weight-light">O</span>
               <span>'Shit</span>
           </v-toolbar-title>
           <v-spacer></v-spacer>
           
            <v-btn @click="logout()" text>
                <span>Exit</span>
                <v-icon right>mdi-power</v-icon>
             </v-btn>
       </v-app-bar>
      <v-navigation-drawer  v-model="drawer" dark app class="blue-grey darken-4">
          <v-layout column align-center>
               <v-flex class="mt-5"> 
                    <v-avatar size="100">
                        <v-img id="avatar" src="../../assets/avatar.png" width="200px"></v-img>
                    </v-avatar>
                    <p class="white--text subheading mt-1 text-center">Bonjour,</p><br>
                    <!--  ça marche pas!! <h1>{{ runner.lastname }} {{ runner.firstname }}</h1>-->
               </v-flex>
                <v-flex class="mt-4 mb-4">
                  <router-link :to="{name: 'Profil'}">
                  <v-btn outlined color="teal lighten-3" dark v-on="on">Modifier mon profil</v-btn>
                  </router-link>
                </v-flex>
          </v-layout>
          <v-list flat>
              <v-list-item v-for="link in links"  :key="link.text" router :to="link.route" active-class="border">
                  <v-list-item-action>
                     <v-icon >{{link.icon}}</v-icon>
                  </v-list-item-action>
                  <v-list-item-content >
                      <v-list-item-title >{{link.text}}</v-list-item-title>
                  </v-list-item-content>
              </v-list-item>
          </v-list>
      </v-navigation-drawer>
   </nav>
</template>
<script>
import axios from "axios";

export default {
   data: () => ({
      drawer: true,
      links :[
          {icon: 'mdi-package-variant', text:'Stock', route: '/partenaire/profil/stock'},
          {icon: 'mdi-run', text:'Livraison', route: '/partenaire/profil/commande'},
          
      ]
     
    }),
    components: {
    
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
}
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>