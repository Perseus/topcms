import { mapState, mapActions, mapGetters } from 'vuex';
import find from 'lodash/find';
import { BButton } from 'buefy/dist/components/button';
import { BDropdown, BDropdownItem } from 'buefy/dist/components/dropdown';
import { BIcon } from 'buefy/dist/components/icon';
import { ValidationProvider } from 'vee-validate';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import TInput from '@components/ValidationInputs/TInput.vue';
import ActionTypes from '../../../../store/types/ActionTypes';

const NewsCreate = {
  name: 'news-create-page',

  data() {
    return {
      title: '',
      content: '',
      author: {},
      editor: ClassicEditor,
    };
  },

  components: {
    TInput,
    ValidationProvider,
    'b-button': BButton,
    'ck-editor': CKEditor.component,
    'b-dropdown': BDropdown,
    'b-dropdown-item': BDropdownItem,
    'b-icon': BIcon
  },

  created() {
    this.author = this.authors[ 0 ] ? this.authors[ 0 ].id : '';
  },
  computed: {
    ...mapComputedToState(),
    ...mapComputedToGetters(),

    currentAuthorDetails() {
      return find( this.authors, { id: this.author } );
    }
  },
  methods: {
    ...mapActionsToMethods(),

    handleCreateNews() {
      if ( !this.author ) {
        return;
      }

      this.createNewsArticle( { title: this.title, content: this.content, author: this.author } );
    }
  },
};

function mapComputedToGetters() {
  return mapGetters( {
    isLoading: 'isCreatingNews',
  } );
}

function mapComputedToState() {
  return mapState( {
    authors: state => state.site.authors,
  } );
}

function mapActionsToMethods() {
  return mapActions( {
    createNewsArticle: ActionTypes.createSiteNews
  } );
}

export default NewsCreate;
