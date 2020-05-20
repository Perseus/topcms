import _ from 'lodash';

import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.FETCHED_COMMERCE_CATEGORIES ]( state, payload ) {
    state.commerceCategories = payload.commerceCategories;
  },

  [ MutationTypes.COMMERCE_CATEGORY_CREATED ]( state, payload ) {
    const { commerceCategory } = payload;
    state.commerceCategories.push( commerceCategory );
  },

  [ MutationTypes.UPDATE_COMMERCE_CATEGORY ]( state, payload ) {
    const { commerceCategory } = payload;
    const { id, name } = commerceCategory;
    const existingCategory = _.findIndex( state.commerceCategories, category => category.id === id );

    if ( existingCategory === -1 ) {
      state.commerceCategories.push( commerceCategory );
    } else {
      state.commerceCategories[ existingCategory ].name = name;
    }
  },

  [ MutationTypes.DELETE_COMMERCE_CATEGORY ]( state, payload ) {
    const { id } = payload;
    state.commerceCategories = state.commerceCategories.filter( category => category.id !== id );
  },

  [ MutationTypes.FETCHED_MALL_ITEMS ]( state, payload ) {
    const { commerceItems } = payload;
    state.commerceItems = commerceItems;
  },

  [ MutationTypes.CREATE_MALL_ITEM ]( state, payload ) {
    state.commerceItems.push( payload );
  },

  [ MutationTypes.UPDATE_MALL_ITEM ]( state, payload ) {
    const { id } = payload;
    const commerceItemToUpdate = _.find( state.commerceItems, item => item.id === id );
    Object.assign( commerceItemToUpdate, payload );
  },

  [ MutationTypes.DELETE_MALL_ITEM ]( state, payload ) {
    const { id } = payload;
    state.commerceItems = state.commerceItems.filter( item => item.id !== id );
  }
};


export default Mutations;
