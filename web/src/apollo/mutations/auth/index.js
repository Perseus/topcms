import gql from 'graphql-tag';

export const loginUserMutation = gql`
    mutation loginUser($input: LoginInput!) {
        loginUser(input: $input) {
            name
            email
            account_details {
                access_levels
            }
        }
    }
`;

export const registerUserMutation = gql`
    mutation createUser($input: SignUpInput!) {
        createUser(input: $input) {
            name
            email
            account_details {
                access_levels
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
