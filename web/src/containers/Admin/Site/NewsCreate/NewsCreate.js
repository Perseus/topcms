import { mapState, mapActions, mapGetters } from 'vuex';
import _ from 'lodash';

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

    async handleCreateNews() {
      const didFormValidationSucceed = await this.$validator.validateAll();
      console.log( didFormValidationSucceed );
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

export default NewsCreate;
