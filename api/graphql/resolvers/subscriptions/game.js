import path from 'path';
import { promises as fs } from 'fs';

import ItemInfoParser from '../../../utils/ItemInfoParser';
import logger from '../../../utils/FileLogger';
import { pubsub } from './index';
import { withFilter } from 'graphql-subscriptions';

export const itemCached = {
  subscribe: withFilter(
    () => pubsub.asyncIterator( 'ITEM_WAS_CACHED' ),
    ( payload, variables ) => {
      console.log( `Payload and variables for subscription: ${payload}, ${variables}` );
      return 'yeet';
    }
  )
};