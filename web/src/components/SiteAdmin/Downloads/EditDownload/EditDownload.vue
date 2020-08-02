<template>
    <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handleEditDownload)">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit Download</p>
        </header>
        <section class="modal-card-body">
          <TInput v-model="title" name="Download Title" label="Title" rules="required:|min:3" />
          <TInput v-model="url" name="Download URL" label="URL" rules="required|is_url" />

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
               <ck-editor :editor="editor" v-model="description"></ck-editor>
              </b-field>
            </ValidationProvider>


          <b-field label="Section">
            <b-dropdown v-model="section" aria-role="list">
              <button class="button is-primary" type="button" slot="trigger">
                <span>{{ section }}</span>
                <b-icon icon="caret-down" size="is-small" pack="fas"></b-icon>
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
                <span>{{ author.name }}</span>
                <b-icon icon="caret-down" size="is-small" pack="fas"></b-icon>
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
          >Edit Download</button>
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>


<script>
import { ValidationProvider } from 'vee-validate';
import { BField } from 'buefy/dist/components/field';
import { BDropdown, BDropdownItem } from 'buefy/dist/components/dropdown';
import { BIcon } from 'buefy/dist/components/icon';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import find from 'lodash/find';

import GeneralConfig from '../../../../config/GeneralConfig';
import TInput from '@components/ValidationInputs/TInput';

export default {
  name: 'edit-download-modal',
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
      default: ''
    },
    authors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      id: '',
      title: '',
      author: '',
      url: '',
      description: '',
      version: '',
      section: 'Client',
      editor: ClassicEditor,
    };
  },

 components: {
    TInput,
    ValidationProvider,
    'b-field': BField,
    'b-dropdown': BDropdown,
    'b-dropdown-item': BDropdownItem,
    'b-icon': BIcon,
    'ck-editor': CKEditor.component,
  },
  
  computed: {
    downloadSections() {
      return GeneralConfig.DOWNLOAD_SECTIONS;
    }
  },

  created() {
    this.id = this.downloadDetails.id;
    this.title = this.downloadDetails.title;
    this.author = this.authors.filter(
      author => author.id === this.downloadDetails.author.id
    )[0];
    this.url = this.downloadDetails.url;
    this.description = this.downloadDetails.description;
    this.version = this.downloadDetails.version;
    this.section = this.downloadDetails.section;
  },
  methods: {
    handleEditDownload() {
      if (this.title === '' || this.author === '' || this.url === '') {
        return;
      }
      this.$emit('editDownload', {
        id: this.id,
        title: this.title,
        author: this.author,
        url: this.url,
        version: this.version,
        section: this.section,
        description: this.description
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