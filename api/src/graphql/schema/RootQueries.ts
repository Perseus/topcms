import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Account {
    act_id: ID
    act_name: String
    gm: Int
    access_levels: [Int]
  }

  type Character {
    cha_id: Int
    cha_name: String
    icon: String
    job: String
    mem_addr: Int
    guild_id: Int
    delflag: Int
    degree: Int
    exp: Int
    gd: Int
    map_x: String
    map_y: String
    map: String
    look: JSON
    birth: String
    credit: String
    estop: String
    bank: String
    guild: Guild
    inventories: [CharacterResource]
    account: Account
  }

  type CharacterResource {
    id: ID
    cha_id: ID
    type_id: Int
    content: JSON
  }
`;
