import { mapState, mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
import { ValidationProvider } from 'vee-validate';

import TInput from '@components/ValidationInputs/TInput.vue';
import ActionTypes from '../../../../store/types/ActionTypes';

const NewsCreate = {
  name: 'news-create-page',

  data() {
    return {
      title: '',
      content: '',
      author: {},
    };
  },

  components: {
    TInput,
    ValidationProvider
  },

  created() {
    this.author = this.authors[ 0 ] ? this.authors[ 0 ].id : '';
  },
  computed: {
    ...mapComputedToState(),
    ...mapComputedToGetters(),

    currentAuthorDetails() {
      return _.find( this.authors, { id: this.author } );
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
