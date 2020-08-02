import { mapState, mapActions } from 'vuex';
import { BModal } from 'buefy/dist/components/modal';
import { BMenu, BMenuList, BMenuItem } from 'buefy/dist/components/menu';


import ActionTypes from '@store/types/ActionTypes';
import PurchaseItem from '@components/Mall/PurchaseItem.vue';

import RouteNames from '../../config/RouteNames';
import GeneralConfig from '../../config/GeneralConfig';

export default {
  name: 'mall',

  data() {
    return {
      activeCategory: 0,
      publicPath: process.env.BASE_URL,
      selectedItemId: -1,
    };
  },

  mounted() {
    if ( this.mallCategories.length > 0 ) {
      this.activeCategory = this.mallCategories[ 0 ].id;
    }
  },

  components: {
    'purchase-item': PurchaseItem,
    'b-menu': BMenu,
    'b-menu-list': BMenuList,
    'b-menu-item': BMenuItem,
    'b-modal': BModal,
  },

  computed: {
    ...mapStateToComputed(),

    isItemMall() {
      return ( this.currentRoute === RouteNames.COMMERCE.ITEM_MALL );
    },

    isAwardCenter() {
      return ( this.currentRoute === RouteNames.COMMERCE.AWARD_CENTER );
    },

    noItemsErrorMessage() {
      if ( this.mallCategories.length === 0 ) {
        return 'There\'s nothing to purchase at the moment';
      }

      return 'There are no items in this category right now.';
    },

    itemsList() {
      const categoryId = this.activeCategory;
      const mallType = this.isItemMall ? 'MALL' : 'CREDIT';

      const items = this.mallItems.filter( item => item.category.id === categoryId && item.mallType === mallType );
      return items;
    },

    selectedItem() {
      if ( this.selectedItemId !== -1 ) {
        const item = this.mallItems.filter( innerItem => innerItem.id === this.selectedItemId )[ 0 ];
        return item;
      }

      return this.itemsList[ 0 ];
    },

    selectedItemIcon() {
      if ( this.selectedItem ) {
        return this.getItemIcon( this.selectedItem );
      }
    },

    shouldShowPurchaseModal() {
      return ( this.modalState.type === GeneralConfig.MODAL_TYPES.PURCHASE_MALL_ITEM );
    },
  },

  methods: {
    ...mapActionsToMethods(),

    isCategoryActive( id ) {
      return ( this.activeCategory === id );
    },

    toggleCategory( id ) {
      this.activeCategory = id;
    },

    getItemName( item ) {
      if ( !item ) {
        return '';
      }

      return item.itemInfo.NAME;
    },

    getItemIcon( item ) {
      if ( item ) {
        const { itemInfo } = item;
        return `${this.publicPath}img/icons/${itemInfo.ICON}.png`;
      }
    },

    getItemPrice( item ) {
      if ( !item ) {
        return 0;
      }

      return item.price;
    },

    getItemDescription( item ) {
      if ( !item ) {
        return '';
      }

      if ( item.itemInfo.DESCRIPTION === '0' ) {
        return '';
      }


      return item.itemInfo.DESCRIPTION;
    },

    getItemTradeValue( item ) {
      if ( !item ) {
        return 0;
      }

      return item.itemInfo.TRADE_PRICE;
    },

    selectItem( id ) {
      this.selectedItemId = id;
    },

    togglePurchase( id ) {
      if ( !this.isLoggedIn ) {
        this.$buefy.toast.open( {
          message: 'You need to be logged in to purchase an item.',
          type: 'is-danger',
          duration: 3000,
        } );
        return;
      }

      const itemData = this.mallItems.filter( item => item.id === id )[ 0 ];
      if ( !itemData ) {
        this.$buefy.toast.open( {
          message: 'Something went wrong while trying to make a purchase. Please try again.',
          type: 'is-danger',
          duration: 3000
        } );

        return;
      }

      if ( itemData.availableQuantity !== -1 && itemData.availableQuantity < 1 ) {
        this.$buefy.toast.open( {
          message: 'The stock of this item has run out. Pleasea try again later',
          type: 'is-info',
          duration: 3000
        } );
      }

      this.toggleModal( {
        type: GeneralConfig.MODAL_TYPES.PURCHASE_MALL_ITEM,
        options: {
          itemData,
        }
      } );
    },

    handlePurchase( { id, quantity } ) {
      this.purchaseMallItem( { id, quantity } );
    },

    getItemAvailability( item ) {
      const { availableQuantity } = item;
      return availableQuantity;
    },
  },
};

function mapStateToComputed() {
  return mapState( {
    currentRoute: state => state.router.currentRoute,
    mallItems: state => state.commerce.commerceItems,
    mallCategories: state => state.commerce.commerceCategories,
    user: state => state.user.userData,
    isLoggedIn: state => state.user.isLoggedIn,
    modalState: state => state.application.modalState
  } );
}

function mapActionsToMethods() {
  return mapActions( {
    toggleModal: ActionTypes.toggleModal,
    purchaseMallItem: ActionTypes.purchaseMallItem,
  } );
}
