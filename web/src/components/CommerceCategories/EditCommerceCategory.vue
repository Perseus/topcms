<template>
<ValidationObserver v-slot="{ handleSubmit }">
  <form @submit.prevent="handleSubmit(handleEditCategory)">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Commerce Category</p>
      </header>
      <section class="modal-card-body">
        <TInput v-model="name" name="Name" placeholder="Category name" rules="required|min:3" />
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
</ValidationObserver>
</template>

<script>

import TInput from '@components/ValidationInputs/TInput';

export default {
  name: 'edit-commerce-category',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },

    categoryEditingError: {
      type: String,
      default: ''
    },

    modalOptions: {
      type: Object,
      default: () => {}
    }
  },

  components: {
    TInput
  },

  data() {
    return {
      name: ''
    };
  },

  created() {
    this.name = this.modalOptions.name;
  },

  methods: {
    handleEditCategory() {
      this.$emit('editCommerceCategory', {
        id: this.modalOptions.id,
        name: this.name
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>