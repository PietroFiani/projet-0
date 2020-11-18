<template>
  <div class="home">
    <v-home-form></v-home-form>
    <img id="img-bk" src="../assets/backgroundImg.svg" alt="livreur représenté en course et à la livraison"> <!--image violette de fond -->
    <img id="logo" src="../assets/logo.svg" alt="logo de la marque">
  </div>
</template>

<script>
// @ is an alias to /src
import VHomeForm from '@/components/VHomeForm.vue'

export default {
  name: 'Home',
  components: {
    VHomeForm
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%; 
  display: flex;
    #img-bk{
      width: 100%;
      position: absolute;
      bottom: 0px;
    }
    #logo{
      position:absolute; 
      top: 1vh; 
      left : 1vw; 
      width: 17vw; 
    }
  }
</style>
