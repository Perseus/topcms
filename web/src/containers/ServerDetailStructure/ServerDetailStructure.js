import { mapActions, mapGetters, mapState } from 'vuex';

import ActionTypes from '../../store/types/ActionTypes';
import ServerInfo from '../../components/ServerInfo/ServerInfo.vue';
import StaffStatusContainer from '../../components/StaffStatusContainer/StaffStatusContainer.vue';
import ServerRatesContainer from '../../components/ServerRates/ServerRates.vue';
import SidebarNavigationContainer from '../../components/SidebarNavigationContainer/SidebarNavigationContainer.vue';

import RouteNames from '../../config/RouteNames';

const ServerDetailStructure = {
  name: 'server-detail-structure',

  components: {
    'server-info': ServerInfo,
    'staff-status-container': StaffStatusContainer,
    'server-rates-container': ServerRatesContainer,
    'sidebar-navigation-container': SidebarNavigationContainer,
  },

  created() {
    this.getServerStats();
    this.retrieveLandingPageInformation();
    this.retrieveStaffInfo();
    this.fetchServerRates();
  },

  computed: {
    ...getStateGetters(),
    ...mapStateToComputed(),

    areThereAnyNewsArticles() {
      return ( Object.keys( this.newsFeed ).length > 0 );
    },

  },

  methods: {
    ...getActionDispatchers(),
  }
};


function getActionDispatchers() {
  return mapActions( {
    getServerStats: ActionTypes.getServerStats,
    changeRoute: ActionTypes.changeRoute,
    retrieveLandingPageInformation: ActionTypes.retrieveLandingPageInformation,
    retrieveStaffInfo: ActionTypes.retrieveStaffOnlineStatus,
    fetchServerRates: ActionTypes.fetchServerRates,
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
    requestsInProgress: state => state.application.currentRequestsInProgress,
    gameStats: state => state.game.gameStats,
  } );
}

function getStateGetters() {
  return mapGetters( {
    isRetrievingGameStats: 'isRetrievingGameStats'
  } );
}

export default ServerDetailStructure;
