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
            ${commonQueryFields()}
            data {
                name
            }
        }
    }
`;

export const updateUserMutation = gql`
    mutation updateUser($userInfo: UpdateUserInput!) {
        updateUser(userInfo: $userInfo) {
            ${commonQueryFields()}
            data {
                name
                email
            }
        }
    }
`;

export const transferItemMutation = gql`
    mutation transferItemToStorageBox($storageId: Int!, $quantity: Int!, $characterId: Int!) {
        transferItemToGame(storageId: $storageId, quantity: $quantity, characterId: $characterId) {
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
