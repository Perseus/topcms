<template>
  <form @submit.prevent="handleEditAuthor">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Author</p>
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
          v-if="authorEditingError.length > 0"
          class="has-text-danger is-size-6"
        >{{ authorEditingError }}</span>
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
</template>


<script src="./EditAuthor.js"></script>
<style src="./EditAuthor.scss" lang="scss" scoped></style>