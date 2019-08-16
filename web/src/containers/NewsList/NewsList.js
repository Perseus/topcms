import { mapActions, mapState, mapGetters } from 'vuex';
import clip from 'text-clipper';

import ActionTypes from '../../store/types/ActionTypes';
import ServerInfo from '../../components/ServerInfo/ServerInfo.vue';
import StaffStatusContainer from '../../components/StaffStatusContainer/StaffStatusContainer.vue';
import ServerRatesContainer from '../../components/ServerRates/ServerRates.vue';
import SidebarNavigationContainer from '../../components/SidebarNavigationContainer/SidebarNavigationContainer.vue';
import RouteNames from '../../config/RouteNames';
import { getDateInWordsToNow } from '../../utils/DateUtils';

const NewsList = {
  name: 'news-list',
  components: {
    'server-info': ServerInfo,
    'staff-status-container': StaffStatusContainer,
    'server-rates-container': ServerRatesContainer,
    'sidebar-navigation-container': SidebarNavigationContainer,
  },
  created() {
    this.getServerStats();
    this.retrieveStaffInfo();
    this.fetchServerRates();
  },
  mounted() {
    this.total = this.totalArticles;
  },
  data() {
    return {
      total: 200,
      current: 1,
      perPage: 10,
      rangeBefore: 1,
      rangeAfter: 1,
      order: '',
      size: '',
      isSimple: false,
      isRounded: false
    };
  },
  computed: {
    ...mapStateToComputed(),
    ...getStateGetters(),
  },
  methods: {
    ...getActionDispatchers(),
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
    getTruncatedHtml( htmlContent ) {
      return clip( htmlContent, 40, { html: true, maxLines: 1 } );
    },
    getDateInWords( date ) {
      return getDateInWordsToNow( date );
    },
    handleNewsFeedPageChange( pageNumber ) {
      const newsFeedOffset = ( ( pageNumber - 1 ) * 10 );
      this.getSiteNewsFeed( { offset: newsFeedOffset } );
    },
    goToNewsPage( id ) {
      this.changeRoute( { name: RouteNames.ROOT.NEWS.ARTICLE, metaData: { params: { id } } } );
    },
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
  } );
}

function getStateGetters() {
  return mapGetters( {
    isRetrievingGameStats: 'isRetrievingGameStats',
    gameStats: 'gameStats',
  } );
}


export default NewsList;
