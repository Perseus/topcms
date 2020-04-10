import _ from 'lodash';

import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.FETCHED_COMMERCE_CATEGORIES ] ( state, payload ) {
    state.commerceCategories = payload.commerceCategories;
  },

  [ MutationTypes.COMMERCE_CATEGORY_CREATED ] ( state, payload ) {
    const { commerceCategory } = payload;
    state.commerceCategories.push( commerceCategory );
  },

  [ MutationTypes.UPDATE_COMMERCE_CATEGORY ] ( state, payload ) {
    const { commerceCategory } = payload;
    const { id, name } = commerceCategory;
    const existingCategory = _.findIndex( state.commerceCategories, category => category.id === id );

    if ( existingCategory === -1 ) {
      state.commerceCategories.push( commerceCategory );
    } else {
      state.commerceCategories[ existingCategory ].name = name;
    }
  },

  [ MutationTypes.DELETE_COMMERCE_CATEGORY ] ( state, payload ) {
    const { id } = payload;
    state.commerceCategories = state.commerceCategories.filter( category => category.id !== id );
  },

  [ MutationTypes.FETCHED_MALL_ITEMS ] ( state, payload ) {
    const { items } = payload;
    state.mallItems = items;
  }
};


export default Mutations;
