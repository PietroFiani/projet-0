<template>
  <div class="team">
  <Navbar></Navbar>
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-col cols="12" class="mt-1 pl-9">
    </v-col>
      <v-card
    class="mx-auto"
    max-width="800"
  >
    <v-card-text>
      <div>Word of the Day</div>
      <p class="display-1 text--primary">
        Derniere livraison:
      </p>
      
      <div class="text--primary">
        
      </div>
    </v-card-text>
    
  </v-card>

  <v-col cols="12" class="mt-1 pl-9">
    </v-col>
  <v-card
    class="mx-auto"
    max-width="800"
  >
    <v-card-text>
      <div>Word of the Day</div>
      <p class="display-1 text--primary">
        Mes Produits:
      </p>
      
      <div class="text--primary">
        
      </div>
    </v-card-text>
    
  </v-card>

  <v-col cols="12" class="mt-1 pl-9">
  </v-col>
  <v-card
    class="mx-auto"
    max-width="800"
  >
    <v-card-text>
      <div>Word of the Day</div>
      <p class="display-1 text--primary">
        Mes preferences:
      </p>
      
      <div class="text--primary">
        
      </div>
    </v-card-text>
    
  </v-card>
    
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