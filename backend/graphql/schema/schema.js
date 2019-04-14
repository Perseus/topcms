import RootQuery from '../queries/RootQuery';
import {
  GraphQLSchema
} from 'graphql';


const Schema = new GraphQLSchema( {
  query: RootQuery
} );

module.exports = Schema;
