import gql from 'graphql-tag';

const getAuthorsQuery = gql`
    query getAuthors {
        authors {
            id
            name
            createdAt
        }
    }
`;

const getDownloadsQuery = gql`
    query getDownloads {
        downloads {
            id
            title
            url
            author {
                id
                name
            }
            createdAt
        }
    }
`;

export { getAuthorsQuery, getDownloadsQuery };
