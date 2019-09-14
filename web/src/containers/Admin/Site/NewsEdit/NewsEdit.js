import { mapState, mapActions, mapGetters } from 'vuex';
import _ from 'lodash';

import ActionTypes from '../../../../store/types/ActionTypes';
import RouteNames from '../../../../config/RouteNames';

const NewsEdit = {
  name: 'news-edit-page',

  data() {
    return {
      title: '',
      content: '',
      author: {},
      currentNewsId: this.$route.params.id,
    };
  },

  created() {
    const currentNewsItem = _.find( this.news, news => news.id === Number( this.currentNewsId ) );
    if ( currentNewsItem ) {
      this.title = currentNewsItem.title;
      this.content = currentNewsItem.content;
      this.author = currentNewsItem.author.id;
    }
  },
  mounted() {

  },
  computed: {
    ...mapComputedToState(),
    ...mapComputedToGetters(),

    currentAuthorDetails() {
      return _.find( this.authors, { id: this.author } );
    },
  },
  methods: {
    ...mapActionsToMethods(),

    async handleEditNews() {
      const didFormValidationSucceed = await this.$validator.validateAll();
      if ( !didFormValidationSucceed ) {
        return;
      }

      try {
        await this.editNewsArticle( {
          id: this.currentNewsId, title: this.title, content: this.content, author: this.author
        } );
      } catch ( err ) {
        const errorMessage = process.env.NODE_ENV === 'development' ? err : 'There was an error while trying to create a news article.';
        this.$buefy.toast.open( {
          duration: 5000,
          message: errorMessage,
          position: 'is-bottom-right',
          type: 'is-danger',
        } );
      }
    },

    goBack() {
      this.changeRoute( { name: RouteNames.ADMIN.SITE } );
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
    news: state => state.site.news,
    authors: state => state.site.authors,
  } );
}

function mapActionsToMethods() {
  return mapActions( {
    editNewsArticle: ActionTypes.updateSiteNews,
    changeRoute: ActionTypes.changeRoute,
  } );
}

export default NewsEdit;
