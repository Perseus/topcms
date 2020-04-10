<template>
  <form @submit.prevent="handleCreateItem">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Commerce Item</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Item ID">
          <b-input
            type="text"
            name="itemId"
            v-validate="'required'"
            placeholder="Item ID"
            v-model="itemId"
            required
          ></b-input>
        </b-field>

        <b-field label="Available Quantity">
          <b-input
            type="text"
            name="availableQuantity"
            v-validate="'required'"
            placeholder="-1"
            v-model="availableQuantity"
            required
          ></b-input>
        </b-field>

        <b-field label="Mall Type">
          <b-select placeholder="Select a type" v-model="mallType">
            <option v-for="(type, key) in mallTypes" :value="type" :key="key">{{ type }}</option>
          </b-select>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button
          :class="[ 'button', 'is-success', { 'is-loading': isLoading } ]"
          type="submit"
        >Create category</button>
      </footer>
    </div>
  </form>
</template>


<script>
export default {
  name: "add-commerce-item",

  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    mallTypes: {
      type: Object,
      default: {}
    }
  },

  computed: {},

  data() {
    return {
      itemId: "",
      availableQuantity: -1,
      mallType: ""
    };
  },

  methods: {
    handleCreateItem() {}
  }
};
</script>
<style lang="scss" scoped></style>