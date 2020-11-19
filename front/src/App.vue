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
  },
  methods: {},
};
</script>
