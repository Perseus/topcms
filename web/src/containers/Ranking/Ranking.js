import { mapActions, mapState } from 'vuex';

import ActionTypes from '../../store/types/ActionTypes';

const RankingPage = {
  name: 'ranking-page',
  data() {
    return {
      playerFilter: 'gold',
    };
  },

  created() {
    this.retrievePlayerRanking( { filter: 'gold' } );
  },

  watch: {
    playerFilter( newVal ) {
      this.retrievePlayerRanking( { filter: newVal } );
    },
  },
  computed: {
    ...mapStateToComputed(),
  },

  methods: {
    ...mapMethodsToActions(),
    getPlayerGuild( guild ) {
      if ( guild && guild.guild_name ) {
        return guild.guild_name;
      }

      return 'N/A';
    },
  }
};

function mapMethodsToActions() {
  return mapActions( {
    retrievePlayerRanking: ActionTypes.retrievePlayerRanking,
  } );
}

function mapStateToComputed() {
  return mapState( {
    playerRanking: state => state.game.playerRanking,
    isRetrievingPlayerRanking: state => state.game.isRetrievingPlayerRanking,
  } );
}
export default RankingPage;
