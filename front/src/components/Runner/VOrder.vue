<template>
  <div>
    <v-data-table :headers="headers" :items="orders">
      <template v-slot:items="props">
        <td>{{ props.item.id_order }}</td>
        <td>{{ props.item.id_customer }}</td>
        <td>{{ props.item.date }}</td>
        <td>{{ props.item.workflow }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          found no results.
        </v-alert>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  props: {
    orders: {},
  },
  data() {
    return {
      headers: [
        {
          text: "n° de commande",
          align: "left",
          value: "id_order",
        },
        { text: "Client", value: "id_customer" },
        { text: "Date", value: "date" },
        { text: "Statut", value: "workflow" },
      ],
    };
  },
};
</script>

<style>
</style>