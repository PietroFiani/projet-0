<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import axios from "axios";
export default {
  name: "App",

  data: () => ({
    customers: {},
    //
  }),
  asyncData() {},
  mounted() {
    // let url = "http://localhost:5000/customers";
    // axios.get(url).then((response) => (this.customers = response.data));
    // console.log(this.customers);
  },
  methods: {},
};
</script>
