<template>
  <form @submit.prevent="handleCreateAuthor">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Author</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Name">
          <b-input
            type="text"
            :value="name"
            name="name"
            v-validate="'required'"
            placeholder="Author name"
            v-model="name"
            required
          ></b-input>
        </b-field>
        <span
          v-if="authorCreationError.length > 0"
          class="has-text-danger is-size-6"
        >{{ authorCreationError }}</span>
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
</template>


<script src="./CreateAuthor.js"></script>
<style src="./CreateAuthor.scss" lang="scss" scoped></style>