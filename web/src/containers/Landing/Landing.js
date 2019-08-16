import { mapActions, mapGetters, mapState } from 'vuex';
import { distanceInWordsToNow } from 'date-fns';
import clip from 'text-clipper';


import ActionTypes from '../../store/types/ActionTypes';
import ServerInfo from '../../components/ServerInfo/ServerInfo.vue';
import StaffStatusContainer from '../../components/StaffStatusContainer/StaffStatusContainer.vue';
import ServerRatesContainer from '../../components/ServerRates/ServerRates.vue';
import SidebarNavigationContainer from '../../components/SidebarNavigationContainer/SidebarNavigationContainer.vue';

import RouteNames from '../../config/RouteNames';

const Landing = {
  name: 't-landing',
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
    getTruncatedHtml( htmlContent ) {
      return clip( htmlContent, 60, { html: true, maxLines: 6 } );
    },
    getDateInWords( date ) {
      // todo: figure out why I need to mutiply the date by 1, probably a typecasting issue
      return distanceInWordsToNow( date * 1 );
    },
    goToNewsPage( id ) {
      this.changeRoute( { name: RouteNames.ROOT.NEWS.ARTICLE, metaData: { params: { id } } } );
    },
    redirectToPage( page ) {
      switch ( page ) {
        case 'news':
          this.changeRoute( { name: RouteNames.ROOT.NEWS.LIST } );
          break;
        case 'home':
          this.changeRoute( { name: RouteNames.ROOT.__LANDING__ } );
          break;
        case 'mall':
          //
          break;
        default:
          break;
      }
    },
    readAllNewsArticles() {
      window.scroll( 0, 0 );
      this.redirectToPage( 'news' );
    },
  },


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
  } );
}

function getStateGetters() {
  return mapGetters( {
    isRetrievingGameStats: 'isRetrievingGameStats',
    gameStats: 'gameStats',
  } );
}

export default Landing;
