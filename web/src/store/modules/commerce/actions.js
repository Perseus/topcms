import { getCommerceCategories } from '../../../apollo/queries/commerce';
import { createMallCategoryMutation, editMallCategoryMutation, deleteMallCategoryMutation } from '../../../apollo/mutations/commerce';


import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';
import request from '../../../services/GraphQLRequest';

import Logger from '../../../services/Logger';

const Actions = {
  async [ ActionTypes.retrieveMallCategories ]( { commit, dispatch } ) {
    try {
      const response = await request.query( getCommerceCategories );
      const { commerceCategories } = response.data;

      commit( MutationTypes.FETCHED_COMMERCE_CATEGORIES, { commerceCategories } );
    } catch ( err ) {
      Logger.log( `Error at action retrieveMallCategories ${err}`, 'error' );
    }
  },

  async [ ActionTypes.createMallCategory ]( { commit, dispatch }, { name } ) {
    try {
      const response = await request.mutation( createMallCategoryMutation, {
        name
      } );

      const { createCommerceCategory: commerceCategory } = response.data;
      commit( MutationTypes.COMMERCE_CATEGORY_CREATED, { commerceCategory } );
    } catch ( err ) {
      Logger.log( `Error at action createMallCategory ${err}`, 'error' );
    }
  },

  async [ ActionTypes.editMallCategory ]( { commit }, { id, name } ) {
    try {
      const response = await request.mutation( editMallCategoryMutation, {
        id,
        name
      } );

      const { editCommerceCategory: commerceCategory } = response.data;
      commit( MutationTypes.UPDATE_COMMERCE_CATEGORY, { commerceCategory } );
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
  }
};

export default Actions;
