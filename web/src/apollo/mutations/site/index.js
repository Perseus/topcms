import gql from 'graphql-tag';

const updateAuthorMutation = gql`
    mutation updateAuthor($id: Int!, $name: String!) {
        editAuthor(id: $id, name: $name) {
            id
            name
        }
    }
`;

const createAuthorMutation = gql`
    mutation createAuthor($name: String!) {
        createAuthor(name: $name) {
            id
            name
        }
    }
`;

export { updateAuthorMutation, createAuthorMutation };
