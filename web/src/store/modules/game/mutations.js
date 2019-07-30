import _ from 'lodash';
import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.RETRIEVING_GAME_STATS ]( state ) {
    state.retrievingGameStats = true;
  },

  [ MutationTypes.RETRIEVED_GAME_STATS ]( state, payload ) {
    state.gameStats = _.get( payload, 'gameStats' );
    state.retrievingGameStats = false;
  },
};

export default Mutations;
