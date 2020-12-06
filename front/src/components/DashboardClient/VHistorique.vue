<template>
  <div class="ma-16">
    <v-data-table
      :headers="headers"
      :items="orders"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
      <template v-slot:body="{ items }">
        <tbody name="list" is="transition-group" v-if="items.length">
          <tr v-for="item in items" :key="item.id_order" class="item-row" @click="handleClick(item)">
            <td>{{ item.id_order }}</td>
            <td>{{ item.firstname }} {{ item.lastname }}</td>
            <td>{{ item.label }}</td>
            <td>{{ item.qtte }}</td>
            <td>{{ item.prix }}</td>
            <td>{{ item.date }}</td>
            <v-chip
              :color="color(item.workflow)"
              dark
              class="mt-2"
              style="width: 100px; justify-content: center"
            >
                {{ item.workflow }}
            </v-chip>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="headers.length" style="text-align: center">
              Pas de commande ? Commandez dés maintenant !
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      color="#515bae"
      :length="pageCount"
    ></v-pagination>

  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      dialogConfirm: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      order : {
        id_order: "",
        workflow: "",
        name: "",
        label: "",
        qtte: "",
        prix: "",
        date: "",
      },
      orders : [],
      headers: [
        {
          text: "n° de commande",
          align: "left",
          value: "id_order",
        },
        { text: "Livreur", value: "name" },
        { text: "Produit", value: "label" },
        { text: "Quantité", value: "qtte" },
        { text: "Prix", value: "prix" },
        { text: "Date", value: "date" },
        { text: "Statut", value: "workflow" },
      ],
    }
  },
  mounted(){
    let url = `http://localhost:5000/orders/${this.$store.state.customerId}`
    axios
    .get(url)
    .then((response) => {
        if (response.data) {
            // console.log("ADDRCUSTOMER", response.data)
            this.orders = response.data
        }
    })
    .catch((error) => {
        console.log("ERREUR", error)
    })
  },
  methods: {
    handleClick(e) {
      console.log("order", e)
      this.order = {
        id_order: e.id_order,
        workflow: e.workflow,
        name: e.firstname,
        label: e.label,
        qtte: e.qtte,
        prix: e.prix,
        date: e.date
      }
      this.dialogConfirm = true
    },
    color(workflow) {
      if (workflow == "Validée") return "primary";
      if (workflow == "En attente") return "orange";
      if (workflow == "Annulée") return "warning";
    },
    initOrder() {
      this.order = {
        id_order: "",
        workflow: "",
        name: "",
        label: "",
        qtte: "",
        prix: "",
        date: "",
      }
    },
  },
}
</script>

<style>
</style>