import { mapState, mapActions, mapGetters } from 'vuex';
import _ from 'lodash';

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

    async handleCreateNews() {
      const didFormValidationSucceed = await this.$validator.validateAll();
      if ( !didFormValidationSucceed || !this.author ) {
        return;
      }

      try {
        await this.createNewsArticle( { title: this.title, content: this.content, author: this.author } );
      } catch ( err ) {
        const errorMessage = process.env.NODE_ENV === 'development' ? err : 'There was an error while trying to create a news article.';
        this.$buefy.toast.open( {
          duration: 5000,
          message: errorMessage,
          position: 'is-bottom-right',
          type: 'is-danger',
        } );
      }
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
