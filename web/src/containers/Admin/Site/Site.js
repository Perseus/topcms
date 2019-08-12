import { mapActions, mapGetters, mapState } from 'vuex';
import AdminNewsDashboard from '../../../components/SiteAdmin/News/Dashboard/NewsDashboard.vue';
import AdminAuthorDashboard from '../../../components/SiteAdmin/Author/Dashboard/AuthorDashboard.vue';
import AdminDownloadsDashboard from '../../../components/SiteAdmin/Downloads/Dashboard/DownloadsDashboard.vue';

import ActionTypes from '../../../store/types/ActionTypes';
import PageNames from '../../../config/RouteNames';
import RouteNames from '../../../config/RouteNames';

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
    }
  },
  methods: {
    ...getActionDispatchers(),
    moveToCreateNewsPage() {
      this.changeRoute( {
        name: PageNames.ADMIN.NEWS.CREATE
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
    handleEditDownload( {
      id, title, author, url
    } ) {
      this.editDownload( {
        id, title, author, url
      } );
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
  } );
}

function getState() {
  return mapState( {
    authors: state => state.site.authors,
    downloads: state => state.site.downloads,
    news: state => state.site.news,
  } );
}


export default Site;
