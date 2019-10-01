import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import ConstraintDirective from 'graphql-constraint-directive';
import resolvers from '../resolvers';
import { isAuthenticatedDirective, websocketAuthentication } from '../directives/auth';

const typeDefs = gql`
  
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
    section: String
    version: String
    description: String
    createdAt: String
    updatedAt: String
    author: Author
    traits: [String]
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

  type Guild {
    guild_name: String
  }

  type CharacterResource {
    id: ID
    cha_id: ID
    type_id: Int
    content: String
  }

  type CharacterRankingItem {
    cha_name: String
    gd: Int
    job: String
    degree: String
    guild: Guild
  }

  type Character {
    cha_id: Int
    cha_name: String
    icon: String
    job: String
    guild_id: Int
    delflag: Int
    degree: Int
    exp: Int
    gd: Int
    map_x: String
    map_y: String
    map: String
    look: String
    birth: String
    credit: String
    estop: String
    bank: String
    guild: Guild
    inventories: [CharacterResource]
  }

  type NewsFeed {
    offset: Int
    articles: [NewsArticle]!
    total_articles: Int
  }
  
  type Account {
    act_id: ID
    act_name: String
    gm: Int
    access_levels: [String]
  }

  input UpdateUserInput {
    email: String @constraint(minLength: 5, format: "email")
    old_password: String @constraint(minLength: 5)
    new_password: String @constraint(minLength: 5)
  }


  type User {
    id: ID
    name: String
    email: String
    ban: Int
    last_login_ip: String
    last_login_mac: String
    account_details: Account
    character_details: [Character]
  }

  type StaffStatus {
    name: String
    type: String
    is_online: String
  }

  type GuildRankingItem {
    guild_name: String
    leader: Character
    member_total: Int
  }

  type FilteredUsersItem {
    users: [User]
    total: Int
  }

  type ItemInfoObject {
    id: Int
    name: String
    icon: String
  }

  type GameInventoryItem {
    id: Int
  }

  type Query {
    users: [User] @isAuthenticated(role: ADMIN)
    me: User @isAuthenticated(role: USER)
    usersWithFilter(filter: String!, searchKey: String, offset: Int, limit: Int): FilteredUsersItem @isAuthenticated(role: ADMIN)
    logout: String @isAuthenticated(role: USER)
    gameStats: GameStats
    newsArticles: [NewsArticle]
    newsFeed(offset: Int, limit: Int): NewsFeed
    author(id: Int!): Author
    authors: [Author]
    downloads: [Download]
    polls: [Poll] @isAuthenticated(role: SITE)
    newsArticle(id: Int!): NewsArticle
    download(id: Int!): Download
    staffStatuses: [StaffStatus]
    serverRateInfo: ServerRateInfo
    playerRankings(filter: String!): [CharacterRankingItem]
    guildRankings(filter: String!): [GuildRankingItem]
    filteredUser(id: ID!): User @isAuthenticated(role: ADMIN)
    filteredCharacter(id: ID!): Character @isAuthenticated(role: ADMIN)
  }

  type Mutation {
    createUser(input: SignUpInput!): User
    loginUser(input: LoginInput!): User
    logoutUser: User
    createAuthor(name: String!): Author @isAuthenticated(role: SITE)
    createNewsArticle(input: NewsArticleInput!): NewsArticle @isAuthenticated(role: SITE) 
    createDownload(title: String!, url: String!, author: Int!, section: String!, description: String!, version: String!): Download @isAuthenticated(role: SITE)
    createPoll(title: String!, options: String!, author: Int!): Poll @isAuthenticated(role: SITE)
    editAuthor(id: Int!, name: String!): Author @isAuthenticated(role: SITE)
    editNewsArticle(input: NewsArticleInput!): NewsArticle @isAuthenticated(role: SITE)
    editDownload(id: Int!, title: String!, url: String!, author: Int!, section: String!, description: String!, version: String!): Download @isAuthenticated(role: SITE) 
    deleteAuthor(id: Int!): Author @isAuthenticated(role: SITE)
    deleteDownload(id: Int!): Download @isAuthenticated(role: SITE)
    deleteNewsArticle(id: Int!): NewsArticle @isAuthenticated(role: SITE)
    updateServerRates(rates: ServerRateInfoInput): ServerRateInfo @isAuthenticated(role: SITE)
    updateUser(userInfo: UpdateUserInput!): User @isAuthenticated(role: USER)
    toggleUserBan(id: Int!, newBanStatus: Int!): User @isAuthenticated(role: ADMIN)
    updateUserFromAdmin(id: ID!, email: String, password: String, gm: Int): User @isAuthenticated(role: ADMIN)
    cacheItemInfo: [ ItemInfoObject ] @isAuthenticated(role: ADMIN)
    resetUserSecurityCode(id: ID!): User @isAuthenticated(role: ADMIN)
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
  }
} );


export default schema;
