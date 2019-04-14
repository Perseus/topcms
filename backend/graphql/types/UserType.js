import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} from 'graphql';

import { AccountServer } from '../../database/models';

const UserType = new GraphQLObjectType( {
  name: 'User',
  fields: () => ( {
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    login_status: {
      type: GraphQLString
    },
    last_login_time: {
      type: GraphQLString
    },
    last_login_ip: {
      type: GraphQLString
    },
    last_login_mac: {
      type: GraphQLString
    }
  } ),
} );

module.exports = UserType;
