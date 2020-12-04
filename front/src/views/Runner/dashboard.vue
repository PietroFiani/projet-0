<template>
  <div class="team">
  <Navbar></Navbar>
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container >
      <v-layout row wrap>
         <v-flex
        sm6
        xs12
        md6
        lg3
      >
       <v-card class="ma-3">
    <v-list-item  >
       <v-list-item-avatar
        tile
        class="mt-n7"
      >
      <v-sheet color="green" width="80" height="80" elevation="10">
            <v-icon dark large>store</v-icon>
      </v-sheet>
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline text-right">Article</div>
        <v-list-item-title class="headline mb-1 text-right" >523614</v-list-item-title>
        <div><v-divider></v-divider></div>
      </v-list-item-content> 
    </v-list-item>
    <v-card-actions>
      <v-icon text class="ma-2">person</v-icon>
      <div class="overline">Iyad</div>
    </v-card-actions>
  </v-card>
      </v-flex>
       <v-flex
        sm6
        xs12
        md6
        lg3
      >
       <v-card class="ma-3">
    <v-list-item>
       <v-list-item-avatar
        tile
        class="mt-n7"
      >
      <v-sheet color="#F44336" width="80" height="80" elevation="10">
            <v-icon dark large>subscriptions</v-icon>
      </v-sheet>
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline text-right">Abonné</div>
        <v-list-item-title class="headline mb-1 text-right" >+700</v-list-item-title>
        <div><v-divider></v-divider></div>
      </v-list-item-content> 
    </v-list-item>
    <v-card-actions>
      <v-icon text class="ma-2">subscriptions</v-icon>
      <div class="overline">AAE IdeaPro</div>
    </v-card-actions>
  </v-card>
      </v-flex>
       <v-flex
        sm6
        xs12
        md6
        lg3
      >
       <v-card class="ma-3">
    <v-list-item>
       <v-list-item-avatar
        tile
        class="mt-n7"
      >
      <v-sheet color="#03A9F4" width="80" height="80" elevation="10">
            <v-icon dark large>add_shopping_cart</v-icon>
      </v-sheet>
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline text-right">Shopping</div>
        <v-list-item-title class="headline mb-1 text-right" >$34,245</v-list-item-title>
        <div><v-divider></v-divider></div>
      </v-list-item-content> 
    </v-list-item>
    <v-card-actions>
      <v-icon text class="ma-2">credit_card</v-icon>
      <div class="overline">VISA Card</div>
    </v-card-actions>
  </v-card>
      </v-flex>
       <v-flex
        sm6
        xs12
        md6
        lg3
      >
       <v-card class="ma-3">
    <v-list-item >
       <v-list-item-avatar
        tile
        class="mt-n7"
      >
      <v-sheet color="#FFC107" width="80" height="80" elevation="10">
            <v-icon dark large>folder_shared</v-icon>
      </v-sheet>
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline text-right">Folder shared</div>
        <v-list-item-title class="headline mb-1 text-right" >1730</v-list-item-title>
        <div><v-divider></v-divider></div>
      </v-list-item-content> 
    </v-list-item>
    <v-card-actions>
      <v-icon text class="ma-2">folder</v-icon>
      <div class="overline">Prodect</div>
    </v-card-actions>
  </v-card>
      </v-flex>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
              <v-card class="text-center ma-3">
                <v-responsive class="pt-4">
                   <v-avatar size="100" class="red lighten-2">
                     <img :src="person.avatar" alt="" >
                   </v-avatar>
                </v-responsive>
                <v-card-text>
                  <div class="subheading">{{person.name}}</div>
                  <div class="grey--text">{{person.role}}</div>
                </v-card-text>
                <v-card-actions>
                    <v-btn outlined color="orange">
                        <v-icon small left >message</v-icon>
                        <span>Message</span>
                    </v-btn>
                </v-card-actions>
              </v-card>
        </v-flex>
       
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Navbar from '@/components/Runner/Navbar'
export default {
  name: 'team',
  components: {
    Navbar,
  },
  data : () => ({
    team: [
      {name: 'beuh', role: 'Type : herbe', avatar:'/img1.png'},
      {name: 'shit', role: 'Type : herbe', avatar:'/img2.png'},
      {name: 'indica', role: 'Type : herbe', avatar:'/img3.png'},
      {name: 'blue weed', role: 'Type : herbe', avatar:'/img4.png'},
    ]
  }),
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