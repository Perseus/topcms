import { mapActions, mapState, mapGetters } from 'vuex';

import ServerDetailStructure from '@containers/ServerDetailStructure/ServerDetailStructure.vue';
import ActionTypes from '../../store/types/ActionTypes';
import GeneralConfig from '../../config/GeneralConfig';
import { getDateInWordsToNow } from '../../utils/DateUtils';

const DownloadList = {
  name: 'download-list',
  components: {
    'server-detail-structure': ServerDetailStructure,
  },
  created() {
    this.getSiteDownloads();
  },

  computed: {
    ...mapStateToComputed(),
    ...getStateGetters(),

    shouldShowVersion() {
      return GeneralConfig.SHOULD_SHOW_VERSION;
    },

    shouldShowSourceIcon() {
      return GeneralConfig.SHOULD_SHOW_DOWNLOAD_SITE_ICON;
    },

    clientDownloads() {
      return ( this.downloads.filter( download => download.section === 'Client' ) );
    },

    patchDownloads() {
      return ( this.downloads.filter( download => download.section === 'Patch' ) );
    },

    otherDownloads() {
      return ( this.downloads.filter( download => download.section === 'Other' ) );
    },
  },
  methods: {
    ...getActionDispatchers(),

    getDateInWords( date ) {
      return getDateInWordsToNow( date );
    },

    getDownloadSections() {
      return GeneralConfig.DOWNLOAD_SECTIONS;
    },

    areThereAnyDownloadsForSection( section ) {
      const downloads = this.getDownloads( section );

      return ( downloads.length > 0 );
    },

    getSourceIcon( download ) {
      const { url } = download;

      if ( url.includes( 'google' ) || url.includes( 'gdrive' ) || url.includes( 'google.drive' ) ) {
        return GeneralConfig.DOWNLOAD_ICONS.GDRIVE;
      }

      if ( url.includes( 'mediafire' ) ) {
        return GeneralConfig.DOWNLOAD_ICONS.MEDIAFIRE;
      }

      if ( url.includes( 'mega' ) ) {
        return GeneralConfig.DOWNLOAD_ICONS.MEGA;
      }

      return GeneralConfig.DOWNLOAD_ICONS.DEFAULT;
    },

    getDownloads( section ) {
      switch ( section ) {
        case 'Client':
          return this.clientDownloads;
        case 'Patch':
          return this.patchDownloads;
        default:
        case 'Other':
          return this.otherDownloads;
      }
    }
  }
};


function getActionDispatchers() {
  return mapActions( {
    getServerStats: ActionTypes.getServerStats,
    changeRoute: ActionTypes.changeRoute,
    retrieveLandingPageInformation: ActionTypes.retrieveLandingPageInformation,
    retrieveStaffInfo: ActionTypes.retrieveStaffOnlineStatus,
    fetchServerRates: ActionTypes.fetchServerRates,
    getSiteNewsFeed: ActionTypes.getSiteNewsFeed,
    getSiteDownloads: ActionTypes.getSiteDownloads,
  } );
}

function mapStateToComputed() {
  return mapState( {
    newsFeed: state => state.application.newsFeed,
    fetchingNewsFeed: state => state.application.fetchingNewsFeed,
    fetchedNewsFeed: state => state.application.fetchedNewsFeed,
    GMInfo: state => state.game.GMInfo,
    fetchingStaffInfo: state => state.game.isFetchingStaffInfo,
    fetchedStaffInfo: state => state.game.isFetchedStaffInfo,
    fetchingServerRates: state => state.game.isFetchingServerRates,
    serverRates: state => state.game.serverRates,
    totalArticles: state => state.application.totalArticles,
    downloads: state => state.site.downloads,
    isFetchingDownloads: state => state.site.fetchingSiteInfo,
  } );
}

function getStateGetters() {
  return mapGetters( {
    isRetrievingGameStats: 'isRetrievingGameStats'
  } );
}


export default DownloadList;
