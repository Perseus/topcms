import gql from 'graphql-tag';

export const getGameStatsQuery = gql`
    query getGameStats {
        gameStats {
            accounts
            characters
            online
            online_record
        }
    }
`;

export const getStaffOnlineStatusQuery = gql`
    query staffStatus {
        staffStatuses {
            name
            type
            is_online
        }
    }
`;


export const getServerRatesQuery = gql`
    query serverRatesInfo {
        serverRateInfo {
            solo
            party
            fairy
            ship
            drop
        }
    }
`;

export const getPlayerRanking = gql`
    query playerRanking($filter: String!) {
        playerRankings(filter: $filter) {
            cha_name
            gd
            job
            degree
            guild {
                guild_name
            }
      }
    }
`;


export const getGuildRanking = gql`
    query guildRanking($filter: String!) {
        guildRankings(filter: $filter) {
            guild_name
            leader {
                cha_name
            }
            member_total
        }
    }
`;
