import TextInput from '../../../components/TextInput/TextInput.vue';
import errorHandlerMixin from '../../../mixins/errorHandler';
import { updateAuthorMutation, createAuthorMutation } from '../../../apollo/mutations/site';
import Constants from '../../../utils/config/Constants';
import { mapActions } from 'vuex';
import RouteNames from '../../../config/RouteNames';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner.vue';
import _ from 'lodash';

const ManageAuthors = {

  name: 'manage-authors',
  props: {
    authors: {
      type: Array,
      default: () => [],
    }
  },
  components: {
    'text-input': TextInput,
    'loading-spinner': LoadingSpinner,
  },
  mixins: [ errorHandlerMixin ],
  data() {
    return {
      authorId: 0,
      showEditForm: false,
      name: "",
      authorDetails: {},
      updateAuthorMutation: updateAuthorMutation,
      createAuthorMutation: createAuthorMutation,
      spinnerOptions: {},
    };
  },

  created() {
    if ( this.$route.name === RouteNames.SITE_MANAGEMENT.MANAGE_AUTHORS ) {
      this.authorId = this.$route.params.id;
      this.showEditForm = true;

      this.authorDetails = this.authors.filter( ( author ) => {
        return ( author.id === this.authorId );
      } )[ 0 ];
      this.name = this.authorDetails.name;
      this.spinnerOptions = {
        primaryColor: '#5C4813',
        height: 14,
        width: 14,
        borderSize: 2,
      }
    } else {
      this.spinnerOptions = {
        primaryColor: '#155239',
        height: 14,
        width: 14,
        borderSize: 2,
      }
    }
  },

  methods: {
    ...mapActions( [
      'triggerToast',
    ] ),
    goBack() {
      this.$router.push( { name: 'site-dashboard' } );
    },
    async handleMutationFinish() {
      await this.triggerToast( { text: 'Author successfully updated', type: Constants.TOAST_TYPES.SUCCESS } );
    },
    async authorCreated( data ) {
      console.log( data );
      await this.triggerToast( { text: 'Author successfully created', type: Constants.TOAST_TYPES.SUCCESS } );
    },
    async handleMutationError( error ) {
      console.log( error.graphQLErrors );

      await this.triggerToast( { text: `Error while updating author: ${error}`, type: Constants.TOAST_TYPES.ERROR } );
    },
  }



};


export default ManageAuthors;
