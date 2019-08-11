import gql from 'graphql-tag';

const loginUserMutation = gql`
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

const registerUserMutation = gql`
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

export { loginUserMutation, registerUserMutation };
