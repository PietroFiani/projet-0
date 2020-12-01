<template>
    <div class="container">
        <v-menu-client></v-menu-client>
    </div>
</template>

<script>
import VMenuClient from './Header/VMenuClient.vue';

export default {
  name: "Header",
  components: {
    VMenuClient, 
  },
};
</script>
