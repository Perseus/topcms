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
            }
        }
    }
`;

const logoutUserQuery = gql`
    query logout {
        logout
    }
`;
export { getCurrentUserQuery, logoutUserQuery };
