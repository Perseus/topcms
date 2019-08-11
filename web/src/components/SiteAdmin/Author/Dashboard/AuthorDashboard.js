import { distanceInWordsToNow } from 'date-fns';
import CreateAuthor from '../CreateAuthor/CreateAuthor.vue';
import EditAuthor from '../EditAuthor/EditAuthor.vue';

const AuthorDashboard = {
  name: 'admin-author-dashboard',
  props: {
    authors: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isCreatingAuthor: {
      type: Boolean,
      default: false,
    },
    authorCreationError: {
      type: String,
      default: '',
    },
    shouldShowEditAuthorModal: {
      type: Boolean,
      default: false
    },
    editAuthorModalDetails: {
      type: Object,
      default: () => {},
    },
    isEditingAuthor: {
      type: Boolean,
      default: false
    },
    authorEditingError: {
      type: String,
      default: '',
    }
  },
  components: {
    'create-author-modal': CreateAuthor,
    'edit-author-modal': EditAuthor,
  },
  data() {
    return {
      columns: [
        {
          field: 'id',
          label: 'ID',
          width: '40',
          numeric: true,
        },
        {
          field: 'name',
          label: 'Name',
        },
        {
          field: 'createdAt',
          label: 'Created At',
        },
        {
          field: 'actions',
          label: 'Actions',
        }
      ],
      shouldShowCreateAuthorModal: false,
    };
  },

  watch: {
    authors() {
      this.shouldShowCreateAuthorModal = false;
    }
  },

  methods: {
    getDateInWords( date ) {
      // todo: figure out why I need to mutiply the date by 1, probably a typecasting issue
      return distanceInWordsToNow( date * 1 );
    },
    showCreateAuthorModal() {
      this.shouldShowCreateAuthorModal = true;
    },
    deleteAuthor( id ) {
      this.$emit( 'delete', id );
    },
    handleCreateAuthor( name ) {
      this.$emit( 'createAuthor', name );
    },
    handleEditAuthor( name, id ) {
      this.$emit( 'editAuthor', { name, id } );
    },
    editAuthorPrompt( id ) {
      this.$emit( 'showEditAuthor', id );
    },
    handleCloseEditModal() {
      this.$emit( 'closeAuthorEditModal' );
    },
    deleteAuthorPrompt( id ) {
      if ( !id ) {
        return;
      }
      this.$dialog.confirm( {
        title: 'Deleting author',
        message: 'Are you sure you want to <b>delete</b> this author? This action cannot be undone.',
        confirmText: 'Delete author',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteAuthor( id );
        }
      } );
    }
  }

};

export default AuthorDashboard;
