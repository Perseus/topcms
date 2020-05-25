import gql from 'graphql-tag';
import { commonQueryFields } from '../../utils';

const getCurrentUserQuery = gql`
    query getCurrentUser {
        me {
            ${commonQueryFields()}
            data {
                name
                email
                account_details {
                    access_levels
                }
                mallPoints
                awardCenterPoints
                character_details {
                    cha_id
                    cha_name
                    mem_addr
                    icon
                    job 
                }
            }
        }
    }
`;

const logoutUserQuery = gql`
    query logout {
        logout
    }
`;

export const getStorageBoxQuery = gql`
    query getStorageBox {
        storageBox {
            ${commonQueryFields()}
            data {
                id
                act_id
                items
                parsedItems
            }
        }
    }
`;

export { getCurrentUserQuery, logoutUserQuery };
