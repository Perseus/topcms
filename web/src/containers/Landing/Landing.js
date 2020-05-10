import { mapActions, mapGetters, mapState } from 'vuex';
import { distanceInWordsToNow } from 'date-fns';
import clip from 'text-clipper';


import ActionTypes from '../../store/types/ActionTypes';
import ServerDetailStructure from '../ServerDetailStructure/ServerDetailStructure.vue';

import RouteNames from '../../config/RouteNames';

const Landing = {
  name: 't-landing',
  components: {
    'server-detail-structure': ServerDetailStructure,
  },
  created() {
  },
  computed: {
    ...getStateGetters(),
    ...mapStateToComputed(),

    areThereAnyNewsArticles() {
      return ( Object.keys( this.newsFeed ).length > 0 );
    },
    fetchingNewsFeed() {
      return ( this.requestsInProgress.includes( 'getNewsFeed' ) );
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
    fetchedNewsFeed: state => state.application.fetchedNewsFeed,
    GMInfo: state => state.game.GMInfo,
    fetchingStaffInfo: state => state.game.isFetchingStaffInfo,
    fetchedStaffInfo: state => state.game.isFetchedStaffInfo,
    fetchingServerRates: state => state.game.isFetchingServerRates,
    serverRates: state => state.game.serverRates,
    requestsInProgress: state => state.application.currentRequestsInProgress,
  } );
}

function getStateGetters() {
  return mapGetters( {
    isRetrievingGameStats: 'isRetrievingGameStats'
  } );
}

export default Landing;
