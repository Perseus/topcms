import { mapState, mapActions } from 'vuex';
import { BTabItem, BTabs } from 'buefy/dist/components/tabs';

import InventoryGrid from '../../../../components/InventoryGrid/InventoryGrid.vue';
import { ItemAttributeMap } from '../../../../config/ItemAttributeMap';
import { getInventoryItemDetailHTML } from '../../../../utils/CharacterUtils';

import InventoryItemTooltip from '../../../../components/InventoryItemTooltip/InventoryItemTooltip.vue';

const GameAdminCharacter = {
  name: 'game-admin-character',
  components: {
    'inventory-grid': InventoryGrid,
    'inventory-item-tooltip': InventoryItemTooltip,
    'b-tabs': BTabs,
    'b-tab-item': BTabItem
  },

  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  computed: {
    ...mapStateToComputed(),

    currentCharacterLocation() {
      const { map } = this.characterDetails;
      const coord_x = this.characterDetails.map_x.slice( 0, this.characterDetails.map_x.length - 2 );
      const coord_y = this.characterDetails.map_y.slice( 0, this.characterDetails.map_y.length - 2 );

      return `${coord_x},${coord_y} in ${map}`;
    },

    currentGear() {
      return this.characterDetails.look;
    }
  },

  methods: {
    getItemIcon( item ) {
      try {
        const itemIcon = item.itemInfo.ICON;
        // eslint-disable-next-line
        return itemIcon;
      } catch ( err ) {
        // eslint-disable-next-line
        return '';
      }
    },

    getContentForTooltip( gear ) {
      if ( gear.itemInfo ) {
        return getInventoryItemDetailHTML( gear );
      }

      return '';
    },

    doesItemHaveIcon( item ) {
      try {
        const itemIcon = item.itemInfo.ICON;

        return Boolean( itemIcon );
      } catch ( err ) {
        return false;
      }
    },

    getTooltipLabel( item ) {
      if ( !item.itemInfo ) {
        return '';
      }

      const itemName = item.itemInfo[ ItemAttributeMap.NAME ];

      return itemName;
    }
  }

};


function mapStateToComputed() {
  return mapState( {
    characterDetails: state => state.admin.retrievedCharacterData,
  } );
}
export default GameAdminCharacter;
