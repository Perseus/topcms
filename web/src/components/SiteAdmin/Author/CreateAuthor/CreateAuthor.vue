<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handleCreateAuthor)">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Create Author</p>
        </header>
        <section class="modal-card-body">
          <TInput v-model="name" name="Author Name" label="Author name" rules="required|min:3" />
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button
            :class="[ 'button', 'is-success', { 'is-loading': isLoading } ]"
            type="submit"
          >Create Author</button>
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>


<script src="./CreateAuthor.js"></script>
<style src="./CreateAuthor.scss" lang="scss" scoped></style>