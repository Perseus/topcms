import { GraphQLJSONObject, GraphQLJSON } from 'graphql-type-json';
import resolvers from '../resolvers';

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

  type GetUsersResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: [User]
  }
  
  input SignUpInput {
    email: String!
    username: String! 
    password: String!
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
    onlineRecord: Int
  }

  type GameStatsResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: GameStats
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
    account: Account
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

  type FilteredUsersResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: FilteredUsersItem
  }

  type FilteredUserResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: User
  }

  type FilteredCharactersResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: FilteredCharactersItem
  }

  type FilteredCharactersItem {
    characters: [Character]
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

  type CommerceCategory {
    id: Int
    name: String
    total_items: Int
  }

  type DownloadResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: Download
  }

  type DownloadsResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: [Download]
  }

  type NewsArticleResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: NewsArticle
  }

  type NewsArticlesResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: [NewsArticle]
  }

  type AuthorResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: Author
  }

  type AuthorsResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: [Author]
  }

  type UserResponse {
    code: String!
    success: Boolean!
    message: String
    errors: JSON
    data: User
  }


  type Query {
    users: GetUsersResponse @isAuthenticated(role: ADMIN)
    me: User @isAuthenticated(role: USER)
    usersWithFilter(filter: String!, searchKey: String, offset: Int, limit: Int): FilteredUsersResponse @isAuthenticated(role: ADMIN)
    charactersWithFilter(filter: String!, searchKey: String, offset: Int, limit: Int): FilteredCharactersResponse @isAuthenticated(role: ADMIN)
    logout: String @isAuthenticated(role: USER)
    gameStats: GameStatsResponse
    newsArticles: NewsArticlesResponse
    newsFeed(offset: Int, limit: Int): NewsFeed
    author(id: Int!): AuthorResponse
    authors: AuthorsResponse
    downloads: DownloadsResponse
    polls: [Poll] @isAuthenticated(role: SITE)
    newsArticle(id: Int!): NewsArticleResponse
    download(id: Int!): DownloadResponse
    staffStatuses: [StaffStatus]
    serverRateInfo: ServerRateInfo
    playerRankings(filter: String!): [CharacterRankingItem]
    guildRankings(filter: String!): [GuildRankingItem]
    filteredUser(id: ID!): FilteredUserResponse 
    filteredCharacter(id: ID!): Character @isAuthenticated(role: ADMIN)
    commerceCategories: [CommerceCategory]
  }

  type Mutation {
    createUser(input: SignUpInput!): UserResponse
    loginUser(input: LoginInput!): User
    logoutUser: User
    createAuthor(name: String!): AuthorResponse @isAuthenticated(role: SITE)
    createNewsArticle(input: NewsArticleInput!): NewsArticleResponse @isAuthenticated(role: SITE) 
    createDownload(title: String!, url: String!, author: Int!, section: String!, description: String!, version: String!): DownloadResponse @isAuthenticated(role: SITE)
    createPoll(title: String!, options: String!, author: Int!): Poll @isAuthenticated(role: SITE)
    editAuthor(id: Int!, name: String!): AuthorResponse @isAuthenticated(role: SITE)
    editNewsArticle(input: NewsArticleInput!): NewsArticleResponse @isAuthenticated(role: SITE)
    editDownload(id: Int!, title: String, url: String, author: Int, section: String, description: String, version: String): DownloadResponse
    deleteAuthor(id: Int!): AuthorResponse @isAuthenticated(role: SITE)
    deleteDownload(id: Int!): Download @isAuthenticated(role: SITE)
    deleteNewsArticle(id: Int!): NewsArticleResponse @isAuthenticated(role: SITE)
    updateServerRates(rates: ServerRateInfoInput): ServerRateInfo @isAuthenticated(role: SITE)
    updateUser(userInfo: UpdateUserInput!): User @isAuthenticated(role: USER)
    toggleUserBan(id: Int!, newBanStatus: Int!): User @isAuthenticated(role: ADMIN)
    updateUserFromAdmin(id: ID!, email: String, password: String, gm: Int): User @isAuthenticated(role: ADMIN)
    cacheItemInfo: [ ItemInfoObject ] @isAuthenticated(role: ADMIN)
    resetUserSecurityCode(id: ID!): User @isAuthenticated(role: ADMIN)

    createCommerceCategory(name: String!): CommerceCategory @isAuthenticated(role: ADMIN)
    editCommerceCategory(id: ID!, name: String!): CommerceCategory @isAuthenticated(role: ADMIN)
    deleteCommerceCategory(id: ID!): CommerceCategory @isAuthenticated(role: ADMIN)
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
