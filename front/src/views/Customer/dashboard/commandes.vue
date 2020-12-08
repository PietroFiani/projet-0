<template>
  
  <div class="container">
      <img src="../../../assets/logoBlanc.svg" class="white-logo"/>
    <v-historique></v-historique>
  </div>
</template>

<script>
import VHistorique from '@/components/DashboardClient/VHistorique.vue'
export default {
  components: { VHistorique },

}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  min-width: 100%;
  background: linear-gradient(180deg, #ffd1d1 0%, #ffaaaa 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.white-logo {
  position: absolute;
  width: 10vmin;
  top: 4vh;
}
</style>