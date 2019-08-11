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
            createdAt
        }
    }
`;

const deleteAuthorMutation = gql`
    mutation deleteAuthor($id: Int!) {
        deleteAuthor(id: $id) {
            id
        }
    }
`;

const createDownloadMutation = gql`
    mutation createDownload($title: String!, $url: String!, $author: Int!) {
        createDownload(title: $title, url: $url, author: $author) {
            id
            title
            url
            createdAt
            author {
                id
                name
            }
        }
    }
`;

const editDownloadMutation = gql`
    mutation editDownload($id: Int!, $title: String!, $url: String!, $author: Int!) {
        editDownload(id: $id, title: $title, url: $url, author: $author) {
            id
            title
            url
            createdAt
            author {
                id
                name
            }
        }
    }
`;

const deleteDownloadMutation = gql`
    mutation deleteDownload($id: Int!) {
        deleteDownload(id: $id) {
            id
        }
    }
`;

export {
  updateAuthorMutation, createAuthorMutation, deleteAuthorMutation, createDownloadMutation, editDownloadMutation, deleteDownloadMutation
};
