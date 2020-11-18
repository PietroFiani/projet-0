<template>
  <div class="container">
      <v-form>
          <v-text-field class="textarea" label="email"></v-text-field>
          <v-text-field class="textarea" label="mot de passe"></v-text-field>
      </v-form>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.container{
    background-color: white;
    height: 60vh;
    width: 50vw;
    border-radius: 25px;
    box-shadow: 0px 4px 4px 7px rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 22vh;
    left: 25vw;
    z-index: 1;
}

</style>