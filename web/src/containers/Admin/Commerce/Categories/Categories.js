import { mapState, mapActions } from 'vuex';

import request from '@services/GraphQLRequest';
import ActionTypes from '../../../../store/types/ActionTypes';
import Constants from '../../../../config/GeneralConfig';
import AddCategoryModal from '../../../../components/CommerceCategories/AddCommerceCategory.vue';
import EditCategoryModal from '../../../../components/CommerceCategories/EditCommerceCategory.vue';


export default {
  name: 'admin-commerce-categories',

  components: {
    'add-commerce-category': AddCategoryModal,
    'edit-commerce-category': EditCategoryModal,
  },
  computed: {
    ...mapStateToComputed(),

    isFetchingCategories() {
      return request.isRequestInProgress( 'commerceCategories' );
    },

    shouldShowAddCategoryModal() {
      return this.modalType === Constants.MODAL_TYPES.ADD_COMMERCE_CATEGORY;
    },

    shouldShowEditCategoryModal() {
      return this.modalType === Constants.MODAL_TYPES.EDIT_COMMERCE_CATEGORY;
    },

    isEditingCommerceCategory() {
      return request.isRequestInProgress( 'editMallCategory' );
    },
    isCreatingCommerceCategory() {
      return request.isRequestInProgress( 'createMallCategory' );
    },
  },

  data() {
    return {
      categoryCreationError: '',
      categoryEditingError: '',
    };
  },
  created() {

  },


  methods: {
    ...mapActionsToMethods(),

    showCategoryCreateModal() {
      this.toggleModal( {
        type: Constants.MODAL_TYPES.ADD_COMMERCE_CATEGORY
      } );
    },

    handleCloseAddModal() {
      this.toggleModal();
    },

    handleCreateCategory( { name } ) {
      this.createMallCategory( { name } ).then( () => {
        this.handleCloseAddModal();
      } ).catch( ( err ) => {
        this.categoryCreationError = err;
      } );
    },

    showCategoryEditModal( id, name ) {
      this.toggleModal( {
        type: Constants.MODAL_TYPES.EDIT_COMMERCE_CATEGORY,
        options: {
          id,
          name
        }
      } );
    },

    handleEditCategory( { id, name } ) {
      this.editMallCategory( { id, name } ).then( () => {
        this.handleCloseAddModal();
      } ).catch( ( err ) => {
        this.categoryEditingError = err;
      } );
    },

    toggleDeletePrompt( id ) {
      if ( !id ) {
        return;
      }

      this.$buefy.dialog.confirm( {
        title: 'Deleting Category',
        message: 'Are you sure you want to <b>delete</b> this category? This action cannot be undone.',
        confirmText: 'Delete Category',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteCategory( id );
        }
      } );
    },

    deleteCategory( id ) {
      this.deleteMallCategory( { id } );
    },
  },


};


function mapActionsToMethods() {
  return mapActions( {
    retrieveCategories: ActionTypes.retrieveMallCategories,
    toggleModal: ActionTypes.toggleModal,
    createMallCategory: ActionTypes.createMallCategory,
    editMallCategory: ActionTypes.editMallCategory,
    deleteMallCategory: ActionTypes.deleteMallCategory,
  } );
}

function mapStateToComputed() {
  return mapState( {
    commerceCategories: state => state.commerce.commerceCategories,
    requestsInProgress: state => state.application.currentRequestsInProgress,
    modalType: state => state.application.modalState.type,
    modalOptions: state => state.application.modalState.options,
  } );
}
