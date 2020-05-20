import { mapState, mapActions } from 'vuex';
import _ from 'lodash';

import ActionTypes from '@store/types/ActionTypes';
import AddCommerceItem from '@components/CommerceItems/AddCommerceItem.vue';
import EditCommerceItem from '@components/CommerceItems/EditCommerceItem.vue';
import request from '@services/GraphQLRequest';
import Constants from '../../../../config/GeneralConfig';

export default {
  name: 'manage-commerce-items',

  components: {
    'add-commerce-item': AddCommerceItem,
    'edit-commerce-item': EditCommerceItem
  },

  methods: {
    ...mapActionsToMethods(),

    showItemCreateModal() {
      this.toggleModal( {
        type: Constants.MODAL_TYPES.ADD_COMMERCE_ITEM
      } );
    },

    showItemEditModal( id ) {
      const itemInfo = _.find( this.mallItems, item => item.id === id );
      this.toggleModal( {
        type: Constants.MODAL_TYPES.EDIT_COMMERCE_ITEM,
        options: {
          mallItem: itemInfo
        }
      } );
    },

    handleCloseModal() {
      this.toggleModal();
    },

    handleCreateItem( payload ) {
      this.createMallItem( payload );
    },

    handleEditItem( payload ) {
      this.editMallItem( payload );
    },

    getTypeName( type ) {
      switch ( type ) {
        case 'MALL':
          return 'Item Mall';
        case 'AWARD':
          return 'Award Center';
        default:
      }
    },

    toggleDeletePrompt( id ) {
      if ( !id ) {
        return;
      }

      this.$buefy.dialog.confirm( {
        title: 'Deleting item',
        message: 'Are you sure you want to <b>delete</b> this item? This action cannot be undone.',
        confirmText: 'Delete Item',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteMallItem( { id } );
        }
      } );
    }
  },

  computed: {
    ...mapStateToComputed(),

    shouldShowAddItemModal() {
      return this.modalType === Constants.MODAL_TYPES.ADD_COMMERCE_ITEM;
    },

    shouldShowEditItemModal() {
      return this.modalType === Constants.MODAL_TYPES.EDIT_COMMERCE_ITEM;
    },

    isFetchingMallItems() {
      return request.isRequestInProgress( 'getCommerceItems' );
    },


    isCreatingCommerceItem() {
      return request.isRequestInProgress( 'createMallItem' );
    },

    isEditingCommerceItem() {
      return request.isRequestInProgress( 'editMallItem' );
    },
  },
};


function mapActionsToMethods() {
  return mapActions( {
    retrieveCategories: ActionTypes.retrieveMallCategories,
    toggleModal: ActionTypes.toggleModal,
    createMallItem: ActionTypes.createMallItem,
    editMallItem: ActionTypes.editMallItem,
    deleteMallItem: ActionTypes.deleteMallItem,
  } );
}

function mapStateToComputed() {
  return mapState( {
    commerceCategories: state => state.commerce.commerceCategories,
    mallItems: state => state.commerce.commerceItems,
    requestsInProgress: state => state.application.currentRequestsInProgress,
    modalType: state => state.application.modalState.type,
    modalOptions: state => state.application.modalState.options,
  } );
}
