<template>
  <div>
    <v-data-table :headers="headers" :items="orders" @click:row="handleClick">
      <template v-slot:items="props">
        <td>{{ props.item.id_order }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.date }}</td>
        <td>{{ props.item.workflow }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          found no results.
        </v-alert>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogConfirm" persistent max-width="600">
      <v-card>
        <v-card-title class="headline">
          Commande numéro {{ order.id }}
        </v-card-title>
        <v-card class="ma-3">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline"
                >{{ order.product.label }} -
                {{ order.product.name }}</v-card-title
              >
              <v-card-text>
                Quantité : {{ order.product.qtte }} grammes<br />
                Prix total : {{ order.product.total }} €
                Adresse de livraison :{{order.road}} - {{order.zip}}
              </v-card-text>

            </div>

            <v-avatar class="ma-3" size="200" tile>
              <v-img src="../../assets/marijuana.jpg"></v-img>
            </v-avatar>
          </div>
        
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogConfirm = false">
              Annuler
            </v-btn>
            <v-btn color="warning" text @click="remove()">
              Supprimer ce produit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-card></v-dialog
    >
  </div>
</template>

<script>
export default {
  props: {
    orders: {},
  },

  data() {
    return {
      dialogConfirm: false,
      order: {
        id: "",
        product:{
            name:"",
            qtte:"",
            total:"",
        },
        road:"",
        zip:""
      },
      headers: [
        {
          text: "n° de commande",
          align: "left",
          value: "id_order",
        },
        { text: "Client", value: "name" },
        { text: "Date", value: "date" },
        { text: "Statut", value: "workflow" },
      ],
    };
  },
  methods: {
    handleClick(e) {
      console.log("order", e);
      this.order={
          id:e.id_order,
          product:{
              name:e.label,
              qtte:e.label,
              total:e.prix,
                         
          },
          road:e.road,
      }

    },
  },
};
</script>

<style>
</style>