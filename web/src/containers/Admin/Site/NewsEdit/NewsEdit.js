import { mapState, mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
import { ValidationProvider } from 'vee-validate';


import TInput from '@components/ValidationInputs/TInput.vue';
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

  components: {
    TInput,
    ValidationProvider
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

    handleEditNews() {
      if ( !this.author ) {
        return;
      }

      this.editNewsArticle( {
        id: this.currentNewsId, title: this.title, content: this.content, author: this.author
      } );
    },

    goBack() {
      this.changeRoute( { name: RouteNames.ADMIN.SITE } );
    }
  },
};

function mapComputedToGetters() {
  return mapGetters( {
    isLoading: 'isUpdatingNews',
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
