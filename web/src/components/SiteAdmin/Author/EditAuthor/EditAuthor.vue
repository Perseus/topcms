<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handleEditAuthor)">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Author</p>
        </header>
        <section class="modal-card-body">
          <TInput v-model="name" name="Author name" :value="name" label="Author Name" rules="required|min:3" />
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button
            :class="[ 'button', 'is-success', { 'is-loading': isLoading } ]"
            type="submit"
          >Edit Author</button>
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>


<script src="./EditAuthor.js"></script>
<style src="./EditAuthor.scss" lang="scss" scoped></style>