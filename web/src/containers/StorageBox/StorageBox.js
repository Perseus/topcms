import { mapState, mapActions } from 'vuex';
import ActionTypes from '@store/types/ActionTypes';
import GraphQLRequest from '@services/GraphQLRequest';


export default {
  name: 'storage-box',

  data() {
    return {
      publicPath: process.env.BASE_URL,
      selectedItem: -1,
      selectedCharacter: -1,
    };
  },

  computed: {
    ...mapStateToComputed(),

    isStorageBoxEmpty() {
      return ( this.storageBox.itemsData.length === 0 );
    },

    isTransferringItem() {
      return GraphQLRequest.isRequestInProgress( 'transferItemToStorageBox' );
    }
  },

  methods: {
    ...mapActionsToMethods(),

    getItemIcon( item ) {
      const itemIcon = item.itemData.ICON;
      return `${this.publicPath}img/icons/${itemIcon}.png`;
    },

    toggleItemSelect( id ) {
      this.selectedItem = id;
    },

    getCharacterIcon( character ) {
      try {
        // eslint-disable-next-line
        return `${this.publicPath}img/chars/${character.icon.toLowerCase()}_${character.job.toLowerCase()}.gif`;
      } catch ( err ) {
        // eslint-disable-next-line
        return `${this.publicPath}img/chars/unknown.gif`;
      }
    },

    selectCharacter( character ) {
      if ( this.isCharacterOnline( character ) ) {
        this.$buefy.toast.open( {
          message: 'You cannot transfer an item to a character that is currently online in game. Please log out of the character and try again.',
          duration: 6000,
          type: 'is-danger',
        } );

        return;
      }

      this.selectedCharacter = character.cha_id;
    },

    isCharacterOnline( character ) {
      return ( character.mem_addr > 0 );
    },

    transferItem() {
      if ( this.selectedCharacter === -1 ) {
        this.$buefy.toast.open( {
          message: 'Please select a character to transfer the item to',
          duration: 3000,
          type: 'is-danger'
        } );

        return;
      }

      if ( this.selectedItem === -1 ) {
        this.$buefy.toast.open( {
          message: 'Please select an item to transfer',
          duration: 3000,
          type: 'is-danger'
        } );

        return;
      }

      const item = _.find( this.storageBox.itemsData, intItem => intItem.id === this.selectedItem );
      const characterId = this.selectedCharacter;

      this.handleTransferItem( { itemId: item.id, quantity: item.quantity, characterId } );
    },
  }
};

function mapActionsToMethods() {
  return mapActions( {
    handleTransferItem: ActionTypes.transferItemFromStorageBox
  } );
}

function mapStateToComputed() {
  return mapState( {
    storageBox: state => state.user.storageBox,
    charactersDetails: state => state.user.userData.characterDetails,
  } );
}
