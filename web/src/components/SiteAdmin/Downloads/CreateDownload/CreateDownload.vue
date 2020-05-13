<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handleCreateDownload)">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create Download</p>
        </header>
        <section class="modal-card-body">
          <TInput v-model="name" name="Download Name" label="Name" rules="required:|min:3" />
          <TInput v-model="link" name="Download Link" label="Link" rules="required|is_url" />

          <ValidationProvider
              rules="required"
              immediate
              v-slot="{ errors, valid }"
              name="Description">
              <b-field
                label="Description"
                :type="{ 'is-danger': errors[0], 'is-success': valid }"
                :message="errors"
              >
                <froala
                  id="edit"
                  :tag="'textarea'"
                  name="description"
                  v-model="description"
                  required
                ></froala>
              </b-field>
            </ValidationProvider>


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
              >{{ downloadSection }}</b-dropdown-item>
            </b-dropdown>
          </b-field>

        
          <TInput label="Version" v-model="version" name="Download Version" rules="required" />

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
  </ValidationObserver>
</template>


<script>
import GeneralConfig from '../../../../config/GeneralConfig';
import { ValidationProvider } from 'vee-validate';
import TInput from '@components/ValidationInputs/TInput';

export default {
  name: 'admin-create-download',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    downloadCreationError: {
      type: String,
      default: ''
    },
    authors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      name: '',
      link: '',
      author: 0,
      description: '',
      version: '',
      section: 'Client'
    };
  },

  components: {
    TInput,
    ValidationProvider
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
    this.author = this.authors[0] ? this.authors[0].id : '';
  },

  methods: {
    async handleCreateDownload() {
      this.$emit('createDownload', {
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