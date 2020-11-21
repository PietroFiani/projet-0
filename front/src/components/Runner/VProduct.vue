<template>
  <div>
    <v-btn block dark color="primary" class="mb-8 mt-8" @click="edit()"
      >Ajouter un nouveau produit</v-btn
    >
    <v-card v-for="(product, index) in products" class="ma-3" :key="index">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="headline"
            >{{ product.label }} - {{ product.name }}</v-card-title
          >

          <v-card-subtitle v-text="product.description"></v-card-subtitle>
          <v-card-text>
            En stock : {{ product.stock }} grammes<br />
            Prix au gramme : {{ product.price }} €
          </v-card-text>

          <v-card-actions>
            <v-btn
              class="ml-2 mt-5"
              outlined
              rounded
              color="secondary"
              @click="edit(product)"
            >
              Modifier
            </v-btn>
            <v-btn class="ml-2 mt-5" outlined rounded color="warning">
              Supprimer
            </v-btn>
          </v-card-actions>
        </div>

        <v-avatar v-if="!product.image" class="ma-3" size="200" tile>
          <v-img src="../../assets/marijuana.jpg"></v-img>
        </v-avatar>
      </div>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="1000">
      <v-card>
        <v-app-bar v-if="add" color="secondary" dark>
          Création d'un produit
          <v-spacer />
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon></v-btn
          >
        </v-app-bar>
        <v-app-bar v-else color="secondary" dark>
          Edition du produit
          <v-spacer />
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon></v-btn
          >
        </v-app-bar>
        <v-card-text>
          <v-text-field
            v-model="newProduct.label"
            label="Nom du produit"
            required
          ></v-text-field>
          <v-text-field
            v-model="newProduct.description"
            label="Description"
            required
          ></v-text-field>
          <v-select
            v-model="newProduct.idCategory"
            label="Catégorie"
            :items="categories"
            :item-text="(item) => item.name"
            :item-value="(item) => item.id"
          ></v-select>
          <v-text-field
            v-model="newProduct.stock"
            label="Quantité disponible"
            required
            type="number"
            suffix="gr"
          ></v-text-field>
          <v-text-field
            v-model="newProduct.price"
            label="Prix"
            required
            type="number"
            suffix="€"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="add" color="warning" text @click="newProduct()">
            Ajouter</v-btn
          >
          <v-btn v-else color="warning" text> Modifier</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    products: {},
  },
  data() {
    return {
      add: true,
      categories: [],
      dialog: false,
      newProduct: {
        label: "",
        stock: 0,
        description: "",
        price: 0,
        photo: "",
        idCategory: 1,
        idRunner: this.$store.state.runnerId,
      },
    };
  },
  methods: {
    edit(product) {
      let url = "http://localhost:5000/categories";
      axios
        .get(url)
        .then((response) => {
          console.log("Categories", response.data);
          this.categories = response.data;
        }) //c'est un objet
        .catch((error) => console.log("Categories error ", error));
      if (product) {
        this.newProduct = product;
        this.add = false;
      } else {
        this.add = true;
      }
      this.dialog = true;
    },
    newProduct() {},
  },
};
</script>

<style>
</style>