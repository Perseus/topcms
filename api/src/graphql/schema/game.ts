import { gql } from 'apollo-server-express';
import { getCommonResponseFields } from '../utils/schema';

export const typeDefs = gql`
  extend type Query {
    gameStats: GameStatsResponse
    staffStatuses: StaffStatusesResponse
    serverRateInfo: ServerRateInfoResponse
    playerRankings(filter: String!): CharacterRankingItemsResponse
    guildRankings(filter: String!): GuildRankingItemsResponse
  }

  extend type Mutation {
    updateServerRates(rates: ServerRateInfoInput): ServerRateInfoResponse @isAuthenticated(role: SITE)
    toggleUserBan(id: Int!, newBanStatus: Int!): UserResponse @isAuthenticated(role: ADMIN)
  }

  type GameStats {
    accounts: Int
    characters: Int
    online: Int
    onlineRecord: Int
  }

  type StaffStatusesResponse {
    ${getCommonResponseFields()}
    data: [StaffStatus]
  }

  type StaffStatus {
    name: String
    type: String
    is_online: String
  }

  type ServerRateInfoResponse {
    ${getCommonResponseFields()}
    data: ServerRateInfo
  }

  type ServerRateInfo {
    solo: Int
    party: Int
    drop: Int
    ship: Int
    fairy: Int
  }

  type CharacterRankingItemsResponse {
    ${getCommonResponseFields()}
    data: [CharacterRankingItem]
  }

  type CharacterRankingItem {
    cha_name: String
    gd: Int
    job: String
    degree: String
    guild: Guild
  }

  type GuildRankingItemsResponse {
    ${getCommonResponseFields()}
    data: [GuildRankingItem]
  }

  type GuildRankingItem {
    guild_name: String
    leader: Character
    member_total: Int
  }

  type Guild {
    guild_name: String
  }

  input ServerRateInfoInput {
    solo: Int
    party: Int
    drop: Int
    ship: Int
    fairy: Int
  }

  type GameStatsResponse {
    ${getCommonResponseFields()}
    data: GameStats
  }

  type GameInventoryItem {
    id: Int
  }
`;
