<template>
  <form @submit.prevent="handleCreateDownload">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Create Download</p>
      </header>
      <section class="modal-card-body">
        <b-field
          label="Name"
          :type="{ 'is-danger': errors.has('name') }"
          :message="errors.first('name')"
        >
          <b-input
            type="text"
            :value="name"
            name="name"
            v-validate="'required'"
            placeholder="Download name"
            v-model="name"
            required
          ></b-input>
        </b-field>

        <b-field
          label="URL"
          :type="{ 'is-danger': errors.has('link') }"
          :message="errors.first('link')"
        >
          <b-input
            type="text"
            :value="link"
            name="link"
            v-validate="{ required: true, url: { require_protocol: true, protocols: [ 'http', 'https' ] }}"
            placeholder="Download Link"
            v-model="link"
            required
          ></b-input>
        </b-field>

        <b-field
          label="Description"
          :type="{ 'is-danger': errors.has('description') }"
          :message="errors.first('description')"
        >
          <froala
            id="edit"
            :tag="'textarea'"
            v-validate="'required'"
            name="description"
            v-model="description"
          ></froala>
        </b-field>

        <b-field label="Section">
          <b-dropdown v-model="section" aria-role="list">
            <button class="button is-primary" type="button" slot="trigger">
              <span>{{ section }}</span>
              <b-icon icon="caret-down" size="is-small"></b-icon>
            </button>
            <b-dropdown-item
              v-for="(downloadSection, index) in downloadSections"
              :key="index"
              :value="downloadSection"
              aria-role="listitem"
            >{{downloadSection }}</b-dropdown-item>
          </b-dropdown>
        </b-field>

        <b-field
          label="Version"
          :type="{ 'is-danger': errors.has('version') }"
          :message="errors.first('version')"
        >
          <b-input
            type="text"
            :value="version"
            name="version"
            v-validate="{ required: true }"
            placeholder="Download Version"
            v-model="version"
            required
          ></b-input>
        </b-field>

        <b-field label="Author" class="select-author">
          <h3
            class="is-size-6 has-text-danger"
            v-if="authors.length === 0"
          >No authors found! Please create an author.</h3>
          <b-dropdown v-else v-model="author" aria-role="list">
            <button class="button is-primary" type="button" slot="trigger">
              <span>{{ currentAuthorDetails.name }}</span>
              <b-icon icon="caret-down" size="is-small"></b-icon>
            </button>
            <b-dropdown-item
              v-for="(authorItem) in authors"
              :key="authorItem.id"
              :value="authorItem.id"
              aria-role="listitem"
            >{{ authorItem.name }}</b-dropdown-item>
          </b-dropdown>
        </b-field>
        <span
          v-if="downloadCreationError.length > 0"
          class="has-text-danger is-size-6"
        >{{ downloadCreationError }}</span>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button
          :class="[ 'button', 'is-success', { 'is-loading': isLoading } ]"
          type="submit"
        >Create Download</button>
      </footer>
    </div>
  </form>
</template>


<script>
import GeneralConfig from "../../../../config/GeneralConfig";

export default {
  name: "admin-create-download",
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    downloadCreationError: {
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
      name: "",
      link: "",
      author: "",
      description: "",
      version: "",
      section: "Client"
    };
  },
  computed: {
    currentAuthorDetails() {
      return _.find(this.authors, { id: this.author });
    },

    downloadSections() {
      return GeneralConfig.DOWNLOAD_SECTIONS;
    }
  },
  created() {
    this.author = this.authors[0] ? this.authors[0].id : "";
  },
  methods: {
    async handleCreateDownload() {
      const didFormValidationSucceed = await this.$validator.validateAll();
      if (!didFormValidationSucceed) {
        return;
      }

      this.$emit("createDownload", {
        name: this.name,
        link: this.link,
        author: this.author,
        description: this.description,
        version: this.version,
        section: this.section
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.select-author {
  margin-bottom: 20px;
}
</style>