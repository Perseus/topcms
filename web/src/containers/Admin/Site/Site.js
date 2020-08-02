import { mapActions, mapGetters, mapState } from 'vuex';
import { BButton } from 'buefy/dist/components/button';
import { BModal } from 'buefy/dist/components/modal';
import { BTabItem, BTabs } from 'buefy/dist/components/tabs';
import { BTable } from 'buefy/dist/components/table';
// import { BModal } from 'buefy/dist/components/modal';

import AdminNewsDashboard from '@components/SiteAdmin/News/Dashboard/NewsDashboard.vue';
import AdminAuthorDashboard from '@components/SiteAdmin/Author/Dashboard/AuthorDashboard.vue';
import AdminDownloadsDashboard from '@components/SiteAdmin/Downloads/Dashboard/DownloadsDashboard.vue';
import ServerRatesUpdateModal from '@components/ServerRateUpdateModal/ServerRateUpdateModal.vue';

import ActionTypes from '../../../store/types/ActionTypes';
import RouteNames from '../../../config/RouteNames';

// const { BModal } = () => import( 'buefy/dist/components/modal' );
const Site = {
  name: 'admin-site',
  data() {
    return {
      activeTab: 0,
      authorError: '',
      shouldShowEditAuthorModal: false,
      editAuthorModalDetails: {},
      shouldShowEditDownloadModal: false,
      editDownloadModalDetails: {},
      shouldShowManageRatesModal: false,
      serverRates: {
        solo: 0,
        drop: 0,
        party: 0,
        ship: 0,
        fairy: 0,
      }
    };
  },

  created() {
    this.fetchAllSiteInfo();
    this.fetchServerRates();
  },

  components: {
    'admin-news-dashboard': AdminNewsDashboard,
    'admin-author-dashboard': AdminAuthorDashboard,
    'admin-downloads-dashboard': AdminDownloadsDashboard,
    'server-rates-update-modal': ServerRatesUpdateModal,
    'b-button': BButton,
    'b-modal': BModal,
    'b-tab': BTabs,
    'b-tab-item': BTabItem,
    'b-table': BTable
  },
  computed: {
    ...getStateGetters(),
    ...getState(),
  },
  mounted() {
    if ( this.fetchedServerRates && Object.keys( this.fetchedServerRates ).length > 0 ) {
      this.serverRates = Object.assign( {}, this.fetchedServerRates );
      delete this.serverRates.__typename;
    }
  },
  watch: {
    authorCreationError( newVal ) {
      if ( newVal.length > 0 ) {
        this.handleAuthorCreationError( newVal );
      }
    },

    isUpdatingAuthor( newVal ) {
      if ( !newVal ) {
        this.shouldShowEditAuthorModal = false;
      }
    },

    isUpdatingDownload( newVal ) {
      if ( !newVal ) {
        this.shouldShowEditDownloadModal = false;
      }
    },

    authorDeletingError( newVal ) {
      if ( newVal.code && newVal.code === 'FOREIGN_KEY_CONSTRAINT_ERROR' ) {
        this.$buefy.toast.open( {
          duration: 5000,
          message: 'There are news articles/downloads depending on this author. Please delete those before deleting this author.',
          position: 'is-bottom-right',
          type: 'is-danger',
        } );
      }
    },

    fetchedServerRates( newVal ) {
      this.serverRates = Object.assign( {}, newVal );
      delete this.serverRates.__typename;
    }
  },
  methods: {
    ...getActionDispatchers(),
    manageEditServerRates( { rates } ) {
      this.updateServerRates( { rates } );
      this.shouldShowManageRatesModal = false;
    },

    handleCloseManageRatesModal() {
      this.shouldShowManageRatesModal = false;
    },

    moveToCreateNewsPage() {
      this.changeRoute( {
        name: RouteNames.ADMIN.NEWS.CREATE
      } );
    },

    fetchAuthors() {
      this.getSiteAuthors();
    },

    handleDeleteAuthor( id ) {
      this.deleteAuthor( { id } );
    },

    handleShowEditAuthor( id ) {
      this.shouldShowEditAuthorModal = true;
      console.log( 'editing author', id, this.authors );
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

    handleCreateDownload( downloadDetails ) {
      this.createDownload( downloadDetails );
    },

    handleDeleteDownload( id ) {
      this.deleteDownload( { id } );
    },

    handleShowEditDownload( id ) {
      this.shouldShowEditDownloadModal = true;
      const extractedDownload = this.downloads.filter( download => download.id === id );
      [ this.editDownloadModalDetails ] = extractedDownload;
    },

    handleCloseDownloadEditModal() {
      this.shouldShowEditDownloadModal = false;
    },

    handleEditDownload( downloadDetails ) {
      this.editDownload( downloadDetails );
    },

    deleteNewsArticle( articleId ) {
      this.deleteNews( { id: articleId } );
    },

    handleEditNewsArticle( articleId ) {
      this.changeRoute( {
        name: RouteNames.ADMIN.NEWS.EDIT,
        metaData: {
          params: {
            id: articleId
          }
        }
      } );
    },

    manageServerRates() {
      this.shouldShowManageRatesModal = true;
    }
  }
};

function getActionDispatchers() {
  return mapActions( {
    fetchAllSiteInfo: ActionTypes.getAllSiteInfo,
    getSiteAuthors: ActionTypes.getSiteAuthors,
    createAuthor: ActionTypes.createSiteAuthor,
    editAuthor: ActionTypes.updateSiteAuthor,
    deleteAuthor: ActionTypes.deleteSiteAuthor,
    createDownload: ActionTypes.createSiteDownload,
    editDownload: ActionTypes.updateSiteDownload,
    deleteDownload: ActionTypes.deleteSiteDownload,
    deleteNews: ActionTypes.deleteSiteNews,
    changeRoute: ActionTypes.changeRoute,
    fetchServerRates: ActionTypes.fetchServerRates,
    updateServerRates: ActionTypes.updateServerRates,
  } );
}

function getStateGetters() {
  return mapGetters( {
    isFetchingSiteInfo: 'isFetchingSiteInfo',
    isCreatingAuthor: 'isCreatingAuthor',
    isUpdatingAuthor: 'isUpdatingAuthor',
    isCreatingDownload: 'isCreatingDownload',
    isUpdatingDownload: 'isUpdatingDownload',
    authorCreationError: 'authorCreationError',
    downloadManagementError: 'downloadManagementError',
    authorEditingError: 'authorEditingError',
    authorDeletingError: 'authorDeletingError',
  } );
}

function getState() {
  return mapState( {
    authors: state => state.site.authors,
    downloads: state => state.site.downloads,
    news: state => state.site.news,
    fetchedServerRates: state => state.game.serverRates,
  } );
}


export default Site;
