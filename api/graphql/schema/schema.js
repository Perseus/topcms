import { gql } from 'apollo-server-express';
import resolvers from '../resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import { isAuthenticatedDirective } from '../directives/auth';
import ConstraintDirective from 'graphql-constraint-directive';

const typeDefs = gql `
  
  directive @isAuthenticated(role: AccessLevels) on FIELD_DEFINITION | QUERY
  directive @constraint(minLength: Int, maxLength: Int, startsWith: String, endsWith: String, contains: String, notContains: String, pattern: String, format: String, min: Float, max: Float, exclusiveMin: Float, exclusiveMax: Float, multipleOf: Float) on FIELD_DEFINITION | QUERY | INPUT_FIELD_DEFINITION

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

  input SignUpInput {
    email: String! @constraint(format: "email", minLength: 1)
    username: String! @constraint(minLength: 5)
    password: String! @constraint(minLength: 8)
  }

  input LoginInput {
    username: String! @constraint(minLength: 5)
    password: String! @constraint(minLength: 8)
  }

  input NewsArticleInput {
    id: Int
    title: String! @constraint(minLength: 4)
    content: String! @constraint(minLength: 10)
    author: Int!
  }

  type ServerRateInfo {
    solo: Int
    party: Int
    drop: Int
    ship: Int
    fairy: Int
  }

  input ServerRateInfoInput {
    solo: Int
    party: Int
    drop: Int
    ship: Int
    fairy: Int
  }

  type GameStats {
    accounts: Int
    characters: Int
    online: Int
    online_record: Int
  }

  type Download {
    id: Int
    title: String
    url: String
    createdAt: String
    updatedAt: String
    author: Author
  }

  type Poll {
    id: Int
    title: String
    options: String
    votes: String
    createdAt: String
    updatedAt: String
    author: Author
  }

  type NewsArticle {
    id: Int
    title: String
    content: String
    createdAt: String
    updatedAt: String
    author: Author
  }

  type Author {
    id: Int
    name: String
    createdAt: String
    updatedAt: String
    downloads: [Download]
    news_articles: [NewsArticle]
    polls: [Poll]
  }

  type NewsFeed {
    offset: Int
    articles: [NewsArticle]!
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

  type StaffStatus {
    name: String
    type: String
    is_online: String
  }


  type Query {
    users: [User] @isAuthenticated(role: ADMIN)
    me: User @isAuthenticated(role: USER)
    logout: String @isAuthenticated(role: USER)
    gameStats: GameStats
    newsArticles: [NewsArticle] @isAuthenticated(role: SITE)
    newsFeed(offset: Int, limit: Int): NewsFeed
    author(id: Int!): Author
    authors: [Author] @isAuthenticated(role: SITE)
    downloads: [Download] @isAuthenticated(role: SITE)
    polls: [Poll] @isAuthenticated(role: SITE)
    newsArticle(id: Int!): NewsArticle
    download(id: Int!): Download
    staffStatuses: [StaffStatus]
    serverRateInfo: ServerRateInfo
  }

  type Mutation {
    createUser(input: SignUpInput!): User
    loginUser(input: LoginInput!): User
    logoutUser: User
    createAuthor(name: String!): Author @isAuthenticated(role: SITE)
    createNewsArticle(input: NewsArticleInput!): NewsArticle @isAuthenticated(role: SITE) 
    createDownload(title: String!, url: String!, author: Int!): Download @isAuthenticated(role: SITE)
    createPoll(title: String!, options: String!, author: Int!): Poll @isAuthenticated(role: SITE)
    editAuthor(id: Int!, name: String!): Author @isAuthenticated(role: SITE)
    editNewsArticle(input: NewsArticleInput!): NewsArticle @isAuthenticated(role: SITE)
    editDownload(id: Int!, title: String!, url: String!, author: Int!): Download @isAuthenticated(role: SITE) 
    deleteAuthor(id: Int!): Author @isAuthenticated(role: SITE)
    deleteDownload(id: Int!): Download @isAuthenticated(role: SITE)
    deleteNewsArticle(id: Int!): NewsArticle @isAuthenticated(role: SITE)
    updateServerRates(rates: ServerRateInfoInput): ServerRateInfo @isAuthenticated(role: SITE)
  }

`;

const schema = makeExecutableSchema( {
  typeDefs,
  resolvers,
  directiveResolvers: {
    isAuthenticated: isAuthenticatedDirective,
  },
  schemaDirectives: {
    constraint: ConstraintDirective
  },
} );


export default schema;
