import { mapActions, mapGetters, mapState } from 'vuex';
import { distanceInWordsToNow } from 'date-fns';
import clip from 'text-clipper';


import ActionTypes from '../../store/types/ActionTypes';
import ServerInfo from '../../components/ServerInfo/ServerInfo.vue';
import RouteNames from '../../config/RouteNames';

const Landing = {
  name: 't-landing',
  components: {
    'server-info': ServerInfo
  },
  created() {
    this.getServerStats();
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
    getTruncatedHtml( htmlContent ) {
      return clip( htmlContent, 60, { html: true, maxLines: 6 } );
    },
    getDateInWords( date ) {
      // todo: figure out why I need to mutiply the date by 1, probably a typecasting issue
      return distanceInWordsToNow( date * 1 );
    },
    goToNewsPage( id ) {
      this.changeRoute( { name: RouteNames.ROOT.NEWS, metaData: { params: { id } } } );
    }
  },


};

function getActionDispatchers() {
  return mapActions( {
    getServerStats: ActionTypes.getServerStats,
    changeRoute: ActionTypes.changeRoute,
    retrieveLandingPageInformation: ActionTypes.retrieveLandingPageInformation,
  } );
}

function mapStateToComputed() {
  return mapState( {
    newsFeed: state => state.application.newsFeed,
    fetchingNewsFeed: state => state.application.fetchingNewsFeed,
    fetchedNewsFeed: state => state.application.fetchedNewsFeed,
  } );
}

function getStateGetters() {
  return mapGetters( {
    isRetrievingGameStats: 'isRetrievingGameStats',
    gameStats: 'gameStats',
  } );
}

export default Landing;
