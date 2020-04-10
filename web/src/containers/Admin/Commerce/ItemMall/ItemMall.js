import { mapState, mapActions } from 'vuex';

import ActionTypes from '../../../../store/types/ActionTypes';
import GeneralConfig from '../../../../config/GeneralConfig';
import { getFilteredMallItems, mallTypeMap } from '../../../../utils/ItemMallUtils';


import AddCommerceItem from '../../../../components/CommerceItems/AddCommerceItem.vue';

export default {
  name: 'admin-commerce-item-mall',

  components: {
    'add-commerce-item': AddCommerceItem
  },

  computed: {
    ...mapStateToComputed(),

    shouldShowItemCreateModal() {
      return ( this.modalType === GeneralConfig.MODAL_TYPES.ADD_ITEM_TO_MALL );
    },

    isCreatingCommerceItem() {
      return this.requestsInProgress.includes( 'createCommerceItem' );
    },

    mallTypes() {
      return mallTypeMap;
    }
  },

  methods: {
    ...mapActionsToMethods(),

    showItemCreateModal() {
      this.toggleModal( {
        type: GeneralConfig.MODAL_TYPES.ADD_ITEM_TO_MALL,
      } );
    },

    getCategoryItems( categoryId ) {
      return getFilteredMallItems( this.mallItems, categoryId );
    },

    getMallType ( type ) {
      return mallTypeMap[ type ];
    },

    handleCloseModal() {
      this.toggleModal();
    },

    handleCreateItem( payload ) {

    },

  },
};


function mapActionsToMethods() {
  return mapActions( {
    toggleModal: ActionTypes.toggleModal,
  } );
}

function mapStateToComputed() {
  return mapState( {
    commerceCategories: state => state.commerce.commerceCategories,
    mallItems: state => state.commerce.mallItems,
    modalType: state => state.application.modalState.type,
    requestsInProgress: state => state.application.currentRequestsInProgress,
  } );
}
