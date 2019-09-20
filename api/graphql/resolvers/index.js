import { Query } from './query';
import { Mutation } from './mutation';
import { User } from './query/RootQueries';
import { Subscription } from './subscriptions';

const resolvers = {
  Query,
  Mutation,
  User,
  Subscription,
};

export default resolvers;
