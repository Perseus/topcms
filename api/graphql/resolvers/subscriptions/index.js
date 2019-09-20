import * as GameSubscriptions from './game';

import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

export const Subscription = {
  ...GameSubscriptions,
};

