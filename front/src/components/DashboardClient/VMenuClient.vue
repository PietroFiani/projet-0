<template>
  <v-row>
    <v-spacer />
    <v-menu offset-y min-width="230" class="mr-16 mt-10 hidden-sm-and-down">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          rounded
          v-on="on"
          x-large
          class="mr-16 mt-10 hidden-sm-and-down"
          width="230"
          style="transition: all 0.4s ease"
          @click="rotate"
        >
          <img
            width="50"
            height="50"
            class="profil-pic"
            src="../../assets/avatar.png"
            alt="photo de profil"
          />
          <h2 class="client-name">
            {{ firstname }}
            {{ lastname }}
          </h2>

          <svg
            class="ml-5 mb-1"
            id="arrow"
            width="20"
            height="51"
            viewBox="0 0 44 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.9061 35.564L21.9373 22.8626L10.9686 35.564L6.58105 33.0237L21.9373 15.2417L37.2936 33.0237L32.9061 35.564Z"
              fill="#000000"
            />
          </svg>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-if="this.$store.state.customerId"
          ><router-link class="link" :to="{ name: 'Dashboard Client' }"
            ><span class="link">Accueil</span></router-link
          ></v-list-item
        >
        <v-list-item v-if="this.$store.state.customerId">
          <router-link class="link" :to="{ name: 'Client Profile' }"
            ><span class="link">Profile</span></router-link
          ></v-list-item
        >
        <v-list-item v-if="this.$store.state.customerId"
          ><router-link class="link" :to="{ name: 'Commandes Client' }"
            ><span class="link">Historique des commandes</span></router-link
          ></v-list-item
        >
        <v-list-item
          ><v-btn text class="link" @click="logout()"
            >Se deconnecter</v-btn
          ></v-list-item
        >
      </v-list>
    </v-menu>
  </v-row>
</template>

<script>
export default {
  props: {
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
  },
  methods: {
    rotate() {
      let arrow = document.getElementById("arrow");
      console.log(arrow);
      if (arrow.style.transform == "rotate(180deg)")
        arrow.style.transform = "rotate(0deg)";
      else arrow.style.transform = "rotate(180deg)";
    },
    logout() {
      if (this.$store.state.runnerId) this.$store.commit("logoutRunner");
      else if (this.$store.state.customerId)
        this.$store.commit("logoutCustomer");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.v-menu__content {
  border-radius: 50px;
}
</style>