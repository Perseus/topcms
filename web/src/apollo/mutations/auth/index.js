import gql from 'graphql-tag';
import { commonQueryFields } from '../../utils';

export const loginUserMutation = gql`
    mutation loginUser($input: LoginInput!) {
        loginUser(input: $input) {
            ${commonQueryFields()}
            data {
                name
                email
                account_details {
                    access_levels
                }
            }
        }
    }
`;

export const registerUserMutation = gql`
    mutation createUser($input: SignUpInput!) {
        createUser(input: $input) {
            ${commonQueryFields()}
            data {
                name
                email
                account_details {
                    access_levels
                }
            }
        }
    }
`;

export const logoutUserMutation = gql`
    mutation logoutUser {
        logoutUser {
            name
        }
    }
`;

export const updateUserMutation = gql`
    mutation updateUser($userInfo: UpdateUserInput!) {
        updateUser(userInfo: $userInfo) {
            name
            email
        }
    }
`;
