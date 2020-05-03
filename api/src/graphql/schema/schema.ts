import { GraphQLJSONObject, GraphQLJSON } from 'graphql-type-json';
import resolvers from '../resolvers';
import SchemaDefs from './index.ts';

const { gql } = require( 'apollo-server-express' );
const { makeExecutableSchema } = require( 'graphql-tools' );
const ConstraintDirective = require( 'graphql-constraint-directive' );
const { isAuthenticatedDirective, websocketAuthentication } = require( '../directives/auth' );

Object.assign( resolvers, {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject
} );

const typeDefs = gql`
  directive @isAuthenticated(role: AccessLevels) on FIELD_DEFINITION | QUERY
  directive @constraint(minLength: Int, maxLength: Int, startsWith: String, endsWith: String, contains: String, notContains: String, pattern: String, format: String, min: Float, max: Float, exclusiveMin: Float, exclusiveMax: Float, multipleOf: Float) on FIELD_DEFINITION | QUERY | INPUT_FIELD_DEFINITION

  scalar JSON
  scalar JSONObject

  enum AccessLevels {
    ADMIN
    SITE
    USER
  }

  enum ValidationRules {
    isNotEmpty
    isNumeric
    isInt
    isEmail
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

`;

const schema = makeExecutableSchema( {
  typeDefs: [ typeDefs, ...SchemaDefs ],
  resolvers,
  directiveResolvers: {
    isAuthenticated: isAuthenticatedDirective,
  },
  schemaDirectives: {
    constraint: ConstraintDirective
  }
} );


module.exports = schema;
