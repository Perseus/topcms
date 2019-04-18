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
  
  type Account {
    act_id: ID
    act_name: String
    gm: Int
    access_levels: [String]
  }

  type User {
    id: ID 
    name: String 
    email: String
    last_login_ip: String
    last_login_mac: String
    account_details: Account
  }

  type Query {
    users: [User] @isAuthenticated(role: ADMIN)
    me: User @isAuthenticated(role: USER)
    logout: String @isAuthenticated(role: USER)
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
