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
    gameStats: GameStats @isAuthenticated(role: SITE)
    newsArticles: [NewsArticle] @isAuthenticated(role: SITE)
    author(id: Int!): Author @isAuthenticated(role: SITE)
    authors: [Author] @isAuthenticated(role: SITE)
    downloads: [Download] @isAuthenticated(role: SITE)
    polls: [Poll] @isAuthenticated(role: SITE)
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User,
    loginUser(name: String!, password: String!): User
    createAuthor(name: String!): Author @isAuthenticated(role: SITE)
    createNewsArticle(title: String!, content: String!, author: Int!): NewsArticle @isAuthenticated(role: SITE) 
    createDownload(title: String!, url: String!, author: Int!): Download @isAuthenticated(role: SITE)
    createPoll(title: String!, options: String!, author: Int!): Poll @isAuthenticated(role: SITE)
    editAuthor(id: Int!, name: String!): Author @isAuthenticated(role: SITE)
    editNewsArticle(id: Int!, title: String!, content: String!, author: Int!): NewsArticle @isAuthenticated(role: SITE)
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
