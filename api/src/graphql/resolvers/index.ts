import { IResolvers } from 'graphql-tools';
import Query from './query';
import Mutation from './mutation';
import { User, CommerceItem } from './query/RootQueries';

const resolvers: IResolvers = {
  Query,
  Mutation,
  User,
  CommerceItem
};

export default resolvers;
