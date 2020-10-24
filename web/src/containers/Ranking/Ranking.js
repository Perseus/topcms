import { mapActions, mapState } from 'vuex';
import { BTabItem, BTabs } from 'buefy/dist/components/tabs';
import { BRadio } from 'buefy/dist/components/radio';
import { BTable, BTableColumn } from 'buefy/dist/components/table';

import ServerDetailStructure from '@containers/ServerDetailStructure/ServerDetailStructure.vue';
import ActionTypes from '../../store/types/ActionTypes';

const RankingPage = {
  name: 'ranking-page',

  components: {
    'b-tabs': BTabs,
    'b-tab-item': BTabItem,
    'b-radio': BRadio,
    'b-table': BTable,
    'b-table-column': BTableColumn,
    'server-detail-structure': ServerDetailStructure,
  },

  data() {
    return {
      playerFilter: 'GOLD',
    };
  },

  created() {
    this.retrievePlayerRanking( { filter: 'GOLD' } );
    this.retrieveGuildRanking();
  },

  watch: {
    playerFilter( newVal ) {
      this.retrievePlayerRanking( { filter: newVal } );
    },
  },
  computed: {
    ...mapStateToComputed(),

    areThereAnyPlayers() {
      return ( this.playerRanking.length > 0 );
    },

    areThereAnyGuilds() {
      return ( this.guildRanking.length > 0 );
    },
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
    retrieveGuildRanking: ActionTypes.retrieveGuildRanking,
  } );
}

function mapStateToComputed() {
  return mapState( {
    playerRanking: state => state.game.playerRanking,
    isRetrievingPlayerRanking: state => state.game.isRetrievingPlayerRanking,
    guildRanking: state => state.game.guildRanking,
    isRetrievingGuildRanking: state => state.game.isRetrievingGuildRanking,
  } );
}
export default RankingPage;
