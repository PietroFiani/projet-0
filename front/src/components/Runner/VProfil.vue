<template>
  <v-card flat>
    <v-card-text
      ><h2>{{ runner.lastname }} {{ runner.firstname }}</h2>
      <p>
        Email : {{ runner.mail }}<br />
        Téléphone : {{ runner.phone }}
      </p>
      Lieux de travail :
      <v-chip
        v-for="delivery in runner.deliveries"
        :key="delivery"
        class="ma-2"
      >
        {{delivery.code}} - {{delivery.nom}}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    runner: {},
  },
};
</script>

<style>
</style>