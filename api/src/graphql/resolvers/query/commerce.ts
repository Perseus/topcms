import MallCategory from '../../../database/models/GameDB/MallCategory';

import { resolve } from '../../utils/resolver';

/**
 * Fetches all existing commerce categories
 */
export const commerceCategories = resolve( {
  async action() {
    const response = await MallCategory.findAll();
    return {
      data: response
    };
  }
} );
