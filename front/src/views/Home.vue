<template>
  <div class="home">
    <img id="logo" src="../assets/logo.svg" alt="logo de la marque">

    <router-link :to="{ name: 'RunnerRegister'}">
        <button class="rounded">Devenir Runner</button>
    </router-link>
    <h1 class="title">Get delivery with Brocoli</h1>
    <v-home-form></v-home-form>
    <img id="img-bk" src="../assets/backgroundImg.svg" alt="livreur représenté en course et à la livraison"> <!--image violette de fond -->
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

$green:#1EAD0B; 
$purple:#470063; 

.home {
  height: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
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
    .rounded{
      font-family: Rubik,sans-serif;
      font-size: 1em;
      border: solid 2px $purple; 
      color: white;
      width: 10em; 
      border-radius: 50px !important;
      position: absolute;
      top:1vh; 
      right:1vw; 
      outline: none;
      transition: 300ms;
      background-color: $purple;
      &:hover{
      color:$purple;
      background-color:white;
    }
  } 
}
.title{
  font-weight: 900; 
  font-style: italic;
  font-size: 3em !important; 
  font-family: Monserrat,sans-serif; 
  color: $purple;
  margin-top: 14vh; 
}
</style>
