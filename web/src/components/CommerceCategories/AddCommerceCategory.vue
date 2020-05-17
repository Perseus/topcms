<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handleCreateCategory)">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Create Commerce Category</p>
        </header>
        <section class="modal-card-body">
          <TInput v-model="name" name="Name" placeholder="Category name" rules="required|min:3" /> 
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
  </ValidationObserver>
</template>

<script>
import TInput from '@components/ValidationInputs/TInput';

export default {
  name: 'add-commerce-category',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },

    categoryCreationError: {
      type: String,
      default: ''
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

  created() {},

  methods: {
    handleCreateCategory() {
      this.$emit('createCommerceCategory', { name: this.name });
    }
  }
};
</script>
<style lang="scss" scoped></style>