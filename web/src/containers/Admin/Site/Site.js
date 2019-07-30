import { mapActions, mapGetters, mapState } from 'vuex';
import AdminNewsDashboard from '../../../components/SiteAdmin/News/Dashboard/NewsDashboard.vue';
import AdminAuthorDashboard from '../../../components/SiteAdmin/Author/Dashboard/AuthorDashboard.vue';
import AdminDownloadsDashboard from '../../../components/SiteAdmin/Downloads/Dashboard/DownloadsDashboard.vue';

import ActionTypes from '../../../store/types/ActionTypes';

const Site = {
  name: 'admin-site',
  data() {
    return {
      activeTab: 0,
      authorError: '',
      shouldShowEditAuthorModal: false,
      editAuthorModalDetails: {},
    };
  },
  created() {
    this.fetchAllSiteInfo();
  },
  components: {
    'admin-news-dashboard': AdminNewsDashboard,
    'admin-author-dashboard': AdminAuthorDashboard,
    'admin-downloads-dashboard': AdminDownloadsDashboard,
  },
  computed: {
    ...getStateGetters(),
    ...getState(),
  },
  watch: {
    authorCreationError( newVal, oldVal ) {
      if ( newVal.length > 0 ) {
        this.handleAuthorCreationError( newVal );
      }
    },

    isUpdatingAuthor( newVal, oldVal ) {
      if ( !newVal ) {
        this.shouldShowEditAuthorModal = false;
      }
    }
  },
  methods: {
    ...getActionDispatchers(),
    fetchAuthors() {
      this.getSiteAuthors();
    },
    handleDeleteAuthor( id ) {
      this.deleteAuthor( { id } );
    },
    handleShowEditAuthor( id ) {
      this.shouldShowEditAuthorModal = true;
      const extractedAuthor = this.authors.filter( author => author.id === id );
      [ this.editAuthorModalDetails ] = extractedAuthor;
    },
    handleCreateAuthor( name ) {
      this.createAuthor( { name } );
    },
    handleAuthorCreationError( errors ) {
      // TODO: figure out a way to show all errors ? not sure if that's needed
      let composedError = '';
      const error = errors[ 0 ];
      if ( error.action === 'create' ) {
        if ( error.code === 'NOT_UNIQUE' ) {
          composedError = `An author with this name already exists`;
        }
      }
      this.authorError = composedError;
    },
    handleCloseAuthorEditModal() {
      this.shouldShowEditAuthorModal = false;
    },
    handleEditAuthor( authorDetails ) {
      this.editAuthor( authorDetails );
    },
  }
};

function getActionDispatchers() {
  return mapActions( {
    fetchAllSiteInfo: ActionTypes.getAllSiteInfo,
    getSiteAuthors: ActionTypes.getSiteAuthors,
    createAuthor: ActionTypes.createSiteAuthor,
    editAuthor: ActionTypes.updateSiteAuthor,
    deleteAuthor: ActionTypes.deleteSiteAuthor,
  } );
}

function getStateGetters() {
  return mapGetters( {
    isFetchingSiteInfo: 'isFetchingSiteInfo',
    isCreatingAuthor: 'isCreatingAuthor',
    isUpdatingAuthor: 'isUpdatingAuthor',
    authorCreationError: 'authorCreationError',
    authorEditingError: 'authorEditingError',
  } );
}

function getState() {
  return mapState( {
    authors: state => state.site.authors,
    downloads: state => state.site.downloads,
  } );
}


export default Site;
