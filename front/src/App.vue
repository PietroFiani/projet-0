<template>
  <v-app>

    <div style="background: linear-gradient(180deg, #9BC9FF 0%, #515BAE 100%); height:100%">
    <router-view></router-view>
    </div>
    <Footer/>
  </v-app>
</template>

<script>
// import axios from "axios";

import Footer from '@/components/Runner/Footer'
export default {
  name: "App",
  components: {
    Footer,

  },

  data: () => ({
    customers: {},
    //
  }),
  asyncData() {},
  mounted() {},
  methods: {},
};
</script>
<style>
.body::-webkit-scrollbar {
  display: none;
} 
.body{
overflow: hidden;
overflow-y: hidden;
 height:100%;
   top:0;
  bottom:0;
}

</style>
