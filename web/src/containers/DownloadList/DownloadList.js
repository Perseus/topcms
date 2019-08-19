import { mapActions, mapState, mapGetters } from 'vuex';
import clip from 'text-clipper';


import ActionTypes from '../../store/types/ActionTypes';
import ServerInfo from '../../components/ServerInfo/ServerInfo.vue';
import StaffStatusContainer from '../../components/StaffStatusContainer/StaffStatusContainer.vue';
import ServerRatesContainer from '../../components/ServerRates/ServerRates.vue';
import SidebarNavigationContainer from '../../components/SidebarNavigationContainer/SidebarNavigationContainer.vue';
import RouteNames from '../../config/RouteNames';
import { getDateInWordsToNow } from '../../utils/DateUtils';

const DownloadList = {
  name: 'download-list',
  components: {
    'server-info': ServerInfo,
    'staff-status-container': StaffStatusContainer,
    'server-rates-container': ServerRatesContainer,
    'sidebar-navigation-container': SidebarNavigationContainer,
  },
  created() {
    this.fetchServerRates();
    this.retrieveStaffInfo();
    this.getServerStats();
    this.getSiteDownloads();
  },

  computed: {
    ...mapStateToComputed(),
    ...getStateGetters(),
  },
  methods: {
    ...getActionDispatchers(),

    getDateInWords( date ) {
      return getDateInWordsToNow( date );
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
    isRetrievingGameStats: 'isRetrievingGameStats',
    gameStats: 'gameStats',
  } );
}


export default DownloadList;
