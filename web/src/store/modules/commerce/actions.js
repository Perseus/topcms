import { getCommerceCategories, getCommerceItems } from '../../../apollo/queries/commerce';
import {
  createMallCategoryMutation, editMallCategoryMutation, deleteMallCategoryMutation, createMallItemMutation, editMallItemMutation, deleteMallItemMutation, purchaseMallItem
} from '../../../apollo/mutations/commerce';


import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';
import request from '../../../services/GraphQLRequest';
import { handleItemPurchaseErrors } from '../../helpers/commerce';
import Logger from '../../../services/Logger';

const Actions = {
  async [ ActionTypes.retrieveMallCategories ]( { commit, dispatch } ) {
    try {
      const { commerceCategories: response } = await request.query( getCommerceCategories );

      commit( MutationTypes.FETCHED_COMMERCE_CATEGORIES, { commerceCategories: response.data } );
    } catch ( err ) {
      Logger.log( `Error at action retrieveMallCategories ${err}`, 'error' );
    }
  },

  async [ ActionTypes.createMallCategory ]( { commit }, { name } ) {
    try {
      const { createCommerceCategory: response } = await request.mutation( createMallCategoryMutation, {
        name
      } );

      commit( MutationTypes.COMMERCE_CATEGORY_CREATED, { commerceCategory: response.data } );
    } catch ( err ) {
      Logger.log( `Error at action createMallCategory ${err}`, 'error' );
    }
  },

  async [ ActionTypes.editMallCategory ]( { commit }, { id, name } ) {
    try {
      const { editCommerceCategory: response } = await request.mutation( editMallCategoryMutation, {
        id,
        name
      } );

      commit( MutationTypes.UPDATE_COMMERCE_CATEGORY, { commerceCategory: response.data } );
    } catch ( err ) {
      Logger.log( `Error at action editMallCategory ${err}`, 'error' );
    }
  },

  async [ ActionTypes.deleteMallCategory ]( { commit }, { id } ) {
    try {
      await request.mutation( deleteMallCategoryMutation, {
        id
      } );

      commit( MutationTypes.DELETE_COMMERCE_CATEGORY, { id } );
    } catch ( err ) {
      Logger.log( `Error at action deleteMallCategory ${err}`, 'error' );
    }
  },

  async [ ActionTypes.retrieveMallItems ]( { commit } ) {
    try {
      const { commerceItems: response } = await request.query( getCommerceItems );
      commit( MutationTypes.FETCHED_MALL_ITEMS, { commerceItems: response.data } );
    } catch ( err ) {
      Logger.log( `Error at action retrieveMallItems ${err}`, 'error' );
    }
  },

  async [ ActionTypes.createMallItem ]( { commit, dispatch }, payload ) {
    try {
      const { createCommerceItem: response } = await request.mutation( createMallItemMutation, payload );
      commit( MutationTypes.CREATE_MALL_ITEM, response.data );

      dispatch( 'toggleModal' );
    } catch ( err ) {
      Logger.log( `Error at action createMallItem ${err}`, 'error' );
    }
  },

  async [ ActionTypes.editMallItem ]( { commit, dispatch }, payload ) {
    try {
      const { editCommerceItem: response } = await request.mutation( editMallItemMutation, payload );

      commit( MutationTypes.UPDATE_MALL_ITEM, response.data );
      dispatch( 'toggleModal' );
    } catch ( err ) {
      Logger.log( `Error at action editMallItem ${err}`, 'error' );
    }
  },

  async [ ActionTypes.deleteMallItem ]( { commit }, payload ) {
    try {
      await request.mutation( deleteMallItemMutation, payload );

      commit( MutationTypes.DELETE_MALL_ITEM, payload );
    } catch ( err ) {
      Logger.log( `Error at action deleteMallItem ${err}`, 'error' );
    }
  },

  async [ ActionTypes.purchaseMallItem ]( { commit, dispatch }, payload ) {
    try {
      payload.quantity = parseInt( payload.quantity );

      const { purchaseCommerceItem: response } = await request.mutation( purchaseMallItem, payload );

      const { user, item } = response.data;

      commit( MutationTypes.UPDATED_USER, { user } );
      commit( MutationTypes.UPDATE_MALL_ITEM, item );

      dispatch( ActionTypes.toggleModal );
    } catch ( err ) {
      handleItemPurchaseErrors( err );
      Logger.log( `Error at action purchaseMallItem: ${err}`, 'error' );
    }
  }
};

export default Actions;
