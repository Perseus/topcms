<template>
  <form @submit.prevent="handleCreateCategory">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Commerce Category</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input
            type="text"
            :value="name"
            name="name"
            v-validate="'required'"
            placeholder="Category name"
            v-model="name"
            required
          ></b-input>
        </b-field>
        <span
          v-if="categoryCreationError.length > 0"
          class="has-text-danger is-size-6"
        >{{ categoryCreationError }}</span>
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
  name: "add-commerce-category",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },

    categoryCreationError: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      name: ""
    };
  },

  created() {},

  methods: {
    handleCreateCategory() {
      this.$emit("createCommerceCategory", { name: this.name });
    }
  }
};
</script>
<style lang="scss" scoped></style>