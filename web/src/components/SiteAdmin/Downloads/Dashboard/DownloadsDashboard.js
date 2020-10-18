import { getDateInWordsToNow } from '@utils/DateUtils';

import { BTable, BTableColumn } from 'buefy/dist/components/table';
import { BModal } from 'buefy/dist/components/modal';
import { BButton } from 'buefy/dist/components/button';

import CreateDownloadModal from '../CreateDownload/CreateDownload.vue';
import EditDownloadModal from '../EditDownload/EditDownload.vue';

const DownloadsDashboard = {
  name: 'admin-downloads-dashboard',
  props: {
    authors: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    downloads: {
      type: Array,
      default: () => [],
    },
    isCreatingDownload: {
      type: Boolean,
      default: false,
    },
    downloadCreationError: {
      type: String,
      default: '',
    },
    downloadEditingError: {
      type: String,
      default: '',
    },
    shouldShowEditDownloadModal: {
      type: Boolean,
      default: false,
    },
    editDownloadModalDetails: {
      type: Object,
      default: () => {},
    },
    isEditingDownload: {
      type: Boolean,
      default: false,
    }
  },

  components: {
    CreateDownloadModal,
    EditDownloadModal,
    'b-button': BButton,
    'b-table': BTable,
    'b-modal': BModal,
    'b-table-column': BTableColumn,
  },

  data() {
    return {
      shouldShowCreateDownloadModal: false,
    };
  },
  watch: {
    downloads() {
      this.shouldShowCreateDownloadModal = false;
    },
  },

  computed: {

  },

  methods: {
    showCreateDownloadModal() {
      this.shouldShowCreateDownloadModal = true;
    },
    getDateInWords( date ) {
      return getDateInWordsToNow( date );
    },
    handleCreateDownload( downloadDetails ) {
      this.$emit( 'createDownload', downloadDetails );
    },
    deleteDownload( id ) {
      this.$emit( 'deleteDownload', id );
    },
    editDownloadPrompt( id ) {
      this.$emit( 'showEditDownload', id );
    },
    deleteDownloadPrompt( id ) {
      if ( !id ) {
        return;
      }
      this.$buefy.dialog.confirm( {
        title: 'Deleting Download',
        message: 'Are you sure you want to <b>delete</b> this download? This action cannot be undone.',
        confirmText: 'Delete Download',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteDownload( id );
        }
      } );
    },
    handleCloseEditModal() {
      this.$emit( 'closeDownloadEditModal' );
    },
    handleEditDownload( downloadDetails ) {
      this.$emit( 'editDownload', downloadDetails );
    },
  }
};

export default DownloadsDashboard;
