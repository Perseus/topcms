<template>
  <form @submit.prevent="handleEditDownload">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Edit Download</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input
            type="text"
            :value="title"
            name="title"
            v-validate="'required'"
            placeholder="Download title"
            v-model="title"
            required
          ></b-input>
        </b-field>
        <b-field label="URL">
          <b-input
            type="text"
            :value="url"
            name="url"
            v-validate="'required|url'"
            placeholder="Download URL"
            v-model="url"
            required
          ></b-input>
        </b-field>
        <b-field label="Author">
          <h3
            class="is-size-6 has-text-danger"
            v-if="authors.length === 0"
          >No authors found! Please create an author.</h3>
          <b-dropdown v-else v-model="author" aria-role="list">
            <button class="button is-primary" type="button" slot="trigger">
              <span>{{ author.name }}</span>
              <b-icon icon="caret-down" size="is-small"></b-icon>
            </button>
            <b-dropdown-item
              v-for="(authorItem) in authors"
              :key="authorItem.id"
              :value="authorItem"
              aria-role="listitem"
            >{{ authorItem.name }}</b-dropdown-item>
          </b-dropdown>
        </b-field>
        <span
          v-if="downloadEditingError.length > 0"
          class="has-text-danger is-size-6"
        >{{ downloadEditingError }}</span>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button
          :class="[ 'button', 'is-success', { 'is-loading': isLoading } ]"
          type="submit"
        >Edit Download</button>
      </footer>
    </div>
  </form>
</template>


<script>
export default {
  name: "edit-download-modal",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    downloadDetails: {
      type: Object,
      default: () => {}
    },
    downloadEditingError: {
      type: String,
      default: ""
    },
    authors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      id: "",
      title: "",
      author: "",
      url: ""
    };
  },
  created() {
    this.id = this.downloadDetails.id;
    this.title = this.downloadDetails.title;
    this.author = this.authors.filter(
      author => author.id === this.downloadDetails.author.id
    )[0];
    this.url = this.downloadDetails.url;
  },
  methods: {
    handleEditDownload() {
      if (this.title === "" || this.author === "" || this.url === "") {
        return;
      }
      this.$emit("editDownload", {
        id: this.id,
        title: this.title,
        author: this.author,
        url: this.url
      });
    }
  }
};
</script>
