import { mapActions, mapGetters } from 'vuex';
import ActionTypes from '../../store/types/ActionTypes';
import ServerInfo from '../../components/ServerInfo/ServerInfo.vue';

const Landing = {
  name: 't-landing',
  components: {
    'server-info': ServerInfo
  },
  created() {
    this.getServerStats();
  },
  computed: {
    ...getStateGetters(),
  },

  methods: {
    ...getActionDispatchers(),
  },


};

function getActionDispatchers() {
  return mapActions( {
    getServerStats: ActionTypes.getServerStats
  } );
}

function getStateGetters() {
  return mapGetters( {
    isRetrievingGameStats: 'isRetrievingGameStats',
    gameStats: 'gameStats',
  } );
}

export default Landing;
