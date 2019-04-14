import { gql } from 'apollo-server-express';
import resolvers from '../resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import { isAuthenticatedDirective } from '../directives/auth';

const typeDefs = gql `
  
  directive @isAuthenticated(role: AccessLevels) on FIELD_DEFINITION | QUERY

  enum AccessLevels {
    ADMIN
    SITE
    USER
  }
  
  type User {
    id: ID 
    name: String 
    email: String
    last_login_ip: String
    last_login_mac: String
  }

  type Query {
    users: [User] @isAuthenticated(role: ADMIN)
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User,
    loginUser(name: String!, password: String!): User
  }

`;

const schema = makeExecutableSchema( {
  typeDefs,
  resolvers,
  directiveResolvers: {
    isAuthenticated: isAuthenticatedDirective
  }
} );

export default schema;
