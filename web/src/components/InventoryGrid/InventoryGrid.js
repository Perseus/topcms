import { ItemAttributeMap } from '../../config/ItemAttributeMap';


const InventoryGrid = {
  name: 'inventory-grid',
  props: {
    inventory: {
      type: Object,
      default: () => {},
    }
  },

  data() {
    return {
      maximumItems: 48,
      inventoryContent: [],
    };
  },

  mounted() {
    this.inventoryContent = this.inventory.content || [];
  },

  methods: {
    getItemIcon( item ) {
      try {
        const itemIcon = item.itemInfo[ ItemAttributeMap.ICON ];
        // eslint-disable-next-line
        return require( `@/assets/img/icons/${itemIcon}.png` );
      } catch ( err ) {
        // eslint-disable-next-line
        return '';
      }
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

      const itemName = item.itemInfo[ ItemAttributeMap.NAME ];

      return itemName;
    },

    getItemAtSlot( index ) {
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

      const doesItemExist = this.inventoryContent.filter( inventoryItem => inventoryItem.slot === index );
      return Boolean( doesItemExist );
    }
  }
};


export default InventoryGrid;
