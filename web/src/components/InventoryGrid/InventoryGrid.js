import _ from 'lodash';

import { ItemAttributeMap } from '../../config/ItemAttributeMap';
import { getInventoryItemDetailHTML } from '../../utils/CharacterUtils';

import InventoryItemTooltip from '../InventoryItemTooltip/InventoryItemTooltip.vue';

const InventoryGrid = {
  name: 'inventory-grid',
  props: {
    inventory: {
      type: Object,
      default: () => {},
    }
  },

  components: {
    'item-tooltip': InventoryItemTooltip,
  },

  data() {
    return {
      maximumItems: 48,
      inventoryContent: [],
      publicPath: process.env.BASE_URL,
    };
  },

  mounted() {
    this.inventoryContent = this.inventory.content || [];
  },

  methods: {
    getItemIcon( item ) {
      return item.itemInfo.ICON;
    },

    doesItemHaveIcon( item ) {
      return Boolean( item.itemInfo.ICON );
    },

    getEmptyGridItems() {
      const totalItems = this.inventoryContent.length;
      const emptyGridItems = this.maximumItems - totalItems;

      return emptyGridItems;
    },

    getTooltipLabel( item ) {
      if ( !item.itemInfo ) {
        return '';
      }

      const itemName = item.itemInfo.NAME;
      return itemName;
    },

    getItemAtSlot( index ) {
      if ( !this.inventoryContent || !Array.isArray( this.inventoryContent ) ) {
        return;
      }

      const item = this.inventoryContent.filter( inventoryItem => Number( inventoryItem.slot ) === index );
      if ( item && item[ 0 ] ) {
        return item[ 0 ];
      }
      return {};
    },

    isThereItemAtSlot( index ) {
      if ( !this.inventoryContent || !Array.isArray( this.inventoryContent ) ) {
        return false;
      }
      const doesItemExist = _.find( this.inventoryContent, inventoryItem => Number( inventoryItem.slot ) === index );
      return Boolean( doesItemExist );
    },

    getContentForTooltip( index ) {
      const item = this.getItemAtSlot( index );
      return getInventoryItemDetailHTML( item );
    },

    getItemCount( item ) {
      if ( !item || !item.dbAttributes ) {
        return '';
      }
      const itemCount = item.dbAttributes[ 2 ];
      return itemCount;
    }
  }
};


export default InventoryGrid;
