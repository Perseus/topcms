import { mapActions, mapGetters, mapState } from 'vuex';

import SidebarLoginCard from '@components/SidebarLoginCard/SidebarLoginCard.vue';
import SidebarMyAccountCard from '@components/SidebarMyAccountCard/SidebarMyAccountCard';
import RouteNames from '../../config/RouteNames';
import ActionTypes from '../../store/types/ActionTypes';
import ServerInfo from '../../components/ServerInfo/ServerInfo.vue';
import StaffStatusContainer from '../../components/StaffStatusContainer/StaffStatusContainer.vue';
import ServerRatesContainer from '../../components/ServerRates/ServerRates.vue';
import SidebarNavigationContainer from '../../components/SidebarNavigationContainer/SidebarNavigationContainer.vue';

const ServerDetailStructure = {
  name: 'server-detail-structure',

  components: {
    'server-info': ServerInfo,
    'staff-status-container': StaffStatusContainer,
    'server-rates-container': ServerRatesContainer,
    'sidebar-navigation-container': SidebarNavigationContainer,
    'sidebar-login-card': SidebarLoginCard,
    'sidebar-myaccount-card': SidebarMyAccountCard,
  },

  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },

  created() {
    this.retrieveLandingPageInformation();
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

    redirectToRegistration() {
      this.changeRoute( {
        name: RouteNames.AUTH.REGISTER,
      } );
    },

    handleAccountRedirects( { name } ) {
      switch ( name ) {
        case 'admin':
          this.changeRoute( {
            name: RouteNames.ADMIN.GAME.INDEX
          } );
          break;
        case 'account':
          this.changeRoute( {
            name: RouteNames.USER.DETAILS
          } );
          break;
        case 'storage':
          this.changeRoute( {
            name: RouteNames.USER.STORAGE_BOX
          } );
          break;
        case 'logout':
          this.logoutUser();
          break;
        default:
      }
    },
  }
};


function getActionDispatchers() {
  return mapActions( {
    getServerStats: ActionTypes.getServerStats,
    changeRoute: ActionTypes.changeRoute,
    retrieveLandingPageInformation: ActionTypes.retrieveLandingPageInformation,
    logoutUser: ActionTypes.logoutUser,
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
    userData: state => state.user.userData,
  } );
}

function getStateGetters() {
  return mapGetters( {
    isRetrievingGameStats: 'isRetrievingGameStats',
    isUserLoggedIn: 'isUserLoggedIn',
  } );
}

export default ServerDetailStructure;
