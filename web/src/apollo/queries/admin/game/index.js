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
