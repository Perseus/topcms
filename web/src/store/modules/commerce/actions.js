import { getCommerceCategories } from '../../../apollo/queries/commerce';
import { createMallCategoryMutation, editMallCategoryMutation, deleteMallCategoryMutation } from '../../../apollo/mutations/commerce';


import ActionTypes from '../../types/ActionTypes';
import MutationTypes from '../../types/MutationTypes';
import request from '../../../services/GraphQLRequest';

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
  }
};

export default Actions;
