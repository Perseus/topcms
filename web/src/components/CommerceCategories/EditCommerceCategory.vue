<template>
  <form @submit.prevent="handleEditCategory">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Commerce Category</p>
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
          v-if="categoryEditingError.length > 0"
          class="has-text-danger is-size-6"
        >{{ categoryEditingError }}</span>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button
          :class="[ 'button', 'is-success', { 'is-loading': isLoading } ]"
          type="submit"
        >Edit category</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: "edit-commerce-category",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },

    categoryEditingError: {
      type: String,
      default: ""
    },

    modalOptions: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      name: ""
    };
  },

  created() {
    this.name = this.modalOptions.name;
  },

  methods: {
    handleEditCategory() {
      this.$emit("editCommerceCategory", {
        id: this.modalOptions.id,
        name: this.name
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>