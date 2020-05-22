import { gql } from 'apollo-server-express';
import { getCommonResponseFields } from '../utils/schema';

export const typeDefs = gql`

  extend type Query {
    users: GetUsersResponse @isAuthenticated(role: ADMIN)
    me: UserResponse @isAuthenticated(role: USER)
    charactersWithFilter(filter: String!, searchKey: String, offset: Int, limit: Int): FilteredCharactersResponse @isAuthenticated(role: ADMIN)
    logout: String @isAuthenticated(role: USER)
    filteredUser(id: ID!): FilteredUserResponse
    filteredCharacter(id: ID!): CharacterResponse @isAuthenticated(role: ADMIN)
    usersWithFilter(filter: String!, searchKey: String, offset: Int, limit: Int): FilteredUsersResponse @isAuthenticated(role: ADMIN)
  }

  extend type Mutation {
    createUser(input: SignUpInput!): UserResponse
    loginUser(input: LoginInput!): UserResponse
    logoutUser: UserResponse
    updateUser(userInfo: UpdateUserInput!): UserResponse @isAuthenticated(role: USER)
    updateUserFromAdmin(id: ID!, email: String, password: String, gm: Int): UserResponse @isAuthenticated(role: ADMIN)
    resetUserSecurityCode(id: ID!): UserResponse @isAuthenticated(role: ADMIN)

    addMallPoints(id: Int!, type: String!, numPoints: Int!): UserResponse @isAuthenticated(role: ADMIN)
  }

  type UserResponse {
    ${getCommonResponseFields()}
    data: User
  }
  
  type UsersResponse {
    ${getCommonResponseFields()}
    data: [User]
  }

  type User {
    id: Int
    name: String
    email: String
    ban: Int
    last_login_ip: String
    last_login_mac: String
    account_details: Account
    character_details: [Character]
    mallPoints: Int
    awardCenterPoints: Int
  }

  type FilteredUsersItem {
    users: [User]
    total: Int
  }

  type CharacterResponse {
    ${getCommonResponseFields()}
    data: Character
  }

  type FilteredUsersResponse {
    ${getCommonResponseFields()}
    data: FilteredUsersItem
  }

  type FilteredUserResponse {
    ${getCommonResponseFields()}
    data: User
  }

  type FilteredCharactersResponse {
    ${getCommonResponseFields()}
    data: FilteredCharactersItem
  }

  type FilteredCharactersItem {
    characters: [Character]
    total: Int
  }

  type GetUsersResponse {
    ${getCommonResponseFields()}
    data: [User]
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

  input UpdateUserInput {
    email: String @constraint(minLength: 5, format: "email")
    old_password: String @constraint(minLength: 5)
    new_password: String @constraint(minLength: 5)
  }

`;
