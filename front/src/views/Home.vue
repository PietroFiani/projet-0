<template>
  <div class="home">
    <img id="logo" src="../assets/logo.svg" alt="logo de la marque">
    <button class="round">Devenir Runner</button>
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
    .round{
      font-family: Rubik,sans-serif;
      font-weight: 500;
      border: solid 2px $purple; 
      color: $purple;
      width: 10em; 
      border-radius: 50px;
      position: absolute;
      top:1vh; 
      right:1vw; 
      outline: none;
      transition: 300ms;
      &:hover{
      color:white;
      background-color:$purple;
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
