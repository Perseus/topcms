import gql from 'graphql-tag';
import { commonQueryFields } from '../../../utils';

export const getGameStatsQuery = gql`
    query getGameStats {
        gameStats {
            ${commonQueryFields()}
            data {
                accounts
                characters
                online
                onlineRecord
            }
        }
    }
`;

export const getStaffOnlineStatusQuery = gql`
    query staffStatus {
        staffStatuses {
            ${commonQueryFields()}
            data {
                name
                type
                is_online
            }
        }
    }
`;


export const getServerRatesQuery = gql`
    query serverRatesInfo {
        serverRateInfo {
            ${commonQueryFields()}
            data {
                solo
                party
                fairy
                ship
                drop
            }
        }
    }
`;

export const getPlayerRanking = gql`
    query playerRanking($filter: String!) {
        playerRankings(filter: $filter) {
            ${commonQueryFields()}
            data {
                cha_name
                gd
                job
                degree
                guild {
                    guild_name
                }
            }
      }
    }
`;


export const getGuildRanking = gql`
    query guildRanking($filter: String!) {
        guildRankings(filter: $filter) {
            ${commonQueryFields()}
            data {
                guild_name
                leader {
                    cha_name
                }
                member_total
            }
        }
    }
`;


export const getFilteredAccounts = gql`
    query usersWithFilter($filter: String!, $searchKey: String, $offset: Int, $limit: Int) {
        usersWithFilter(filter: $filter, searchKey: $searchKey, offset: $offset, limit: $limit) {
            ${commonQueryFields()}
            data {
                users {
                    id
                    name
                    last_login_ip
                    last_login_mac
                    ban
                    account_details {
                        gm
                    }
                }
                total
            }
        }
    }
`;

export const getAccountData = gql`
    query filteredUser($id: ID!) {
        filteredUser(id: $id) {
            ${commonQueryFields()}
            data {
                id
                name
                email
                ban
                last_login_ip
                last_login_mac
                account_details {
                  gm
                }
                character_details {
                  cha_id
                  cha_name
                  job
                  icon
                  delflag
                }
            }
        }
    }
`;

export const getFilteredCharacters = gql`
    query charactersWithFilter($filter: String!, $searchKey: String, $offset: Int, $limit: Int) {
        charactersWithFilter(filter: $filter, searchKey: $searchKey, offset: $offset, limit: $limit) {
            ${commonQueryFields()}
            data {
                total
                characters {
                    cha_name
                    cha_id
                    account {
                        act_id
                        act_name
                    }
                    degree
                    gd
                    guild {
                        guild_name
                    }
                }
            }
        }
    }
`;

export const getCharacterData = gql`
    query filteredCharacter($id: ID!) {
        filteredCharacter(id: $id) {
            ${commonQueryFields()}
            data {
                cha_name
                map_x
                map_y
                map
                bank
                job
                gd
                degree
                look
                credit
                inventories {
                        id
                        cha_id
                        content
                }
                guild {
                    guild_name
                }    
            }
    }
}
`;
