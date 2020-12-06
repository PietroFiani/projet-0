<template>
	<div class="ma-16">
	<Navbar></Navbar>
    <v-data-table :headers="headers" :items="orders" @click:row="handleClick">
      <template v-slot:items="props">
        <td>{{ props.item.id_order }}</td>
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.date }}</td>
        <td>{{ props.item.workflow }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Vous n'avez pas encore de commande ? Patience !
        </v-alert>
      </template>
    </v-data-table>

    <v-dialog v-model="dialogConfirm" persistent max-width="600">
      <v-card>
        <v-app-bar color="secondary" dark>
          Commande numéro {{ order.id }} - {{ order.workflow }}
          <v-spacer />
          <v-btn icon @click="confirmDialog = false">
            <v-icon>mdi-close</v-icon></v-btn
          >
        </v-app-bar>

        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">
              {{ order.product.name }}</v-card-title
            >
            <v-card-text>
              Quantité commandée: {{ order.product.qtte }} grammes<br />
              Prix total : {{ order.product.total }} € <br />
              Adresse de livraison : <br />{{ order.customerName }} <br />{{
                order.road
              }}
              <br />
              {{ order.zip }}
            </v-card-text>
          </div>

          <v-avatar class="ma-3" size="200" tile>
            <v-img src="../../assets/marijuana.jpg"></v-img>
          </v-avatar>
        </div>

        <v-card-actions v-if="order.workflow == 'En attente'">
          <v-btn color="primary" dark @click="updateWorkflow('Validée')">
            Valider la commande
          </v-btn>
          <v-spacer />
          <v-btn color="warning" dark @click="updateWorkflow('Annulée')">
            Annuler la commande</v-btn
          >
        </v-card-actions>
        <v-card-actions v-if="order.workflow == 'Validée'">
          <v-spacer />
          <v-btn color="warning" dark @click="updateWorkflow('Annulée')">
            Annuler la commande</v-btn
          >
        </v-card-actions>
      </v-card></v-dialog
    >
  </div>
</template>



<script>
import Navbar from '@/components/Runner/Navbar'
import axios from "axios";
export default {
  props: {
    orders: {},
  },
  components: {
    Navbar,
  },
  data() {
    return {
      dialogConfirm: false,
      order: {
        id: "",
        workflow: "",
        customerName: "",
        product: {
          name: "",
          qtte: "",
          total: "",
        },
        road: "",
        zip: "",
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
      this.order = {
        id: e.id_order,
        workflow: e.workflow,
        customerName: e.name,
        product: {
          name: e.label,
          qtte: e.qtte,
          total: e.prix,
        },
        road: e.road,
        zip: e.zip,
      };
      this.dialogConfirm = true;
    },
    initOrder() {
      this.order = {
        id: "",
        workflow: "",
        customerName: "",
        product: {
          name: "",
          qtte: "",
          total: "",
        },
        road: "",
        zip: "",
      };
    },
    updateWorkflow(workflow) {
      let url = `http://localhost:5000/order/updateWorkflow/${this.order.id}`;
      axios
        .put(url, {
          workflow: workflow,
        })
        .then((response) => {
          console.log("Updated Order Workflow", response.data);
          this.dialogConfirm = true;
          this.initOrder();
          this.$emit("reload");
        })
        .catch((error) => console.log("Order error ", error));
    },
  },
};
</script>