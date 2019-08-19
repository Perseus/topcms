import gql from 'graphql-tag';

export const updateAuthorMutation = gql`
    mutation updateAuthor($id: Int!, $name: String!) {
        editAuthor(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const createAuthorMutation = gql`
    mutation createAuthor($name: String!) {
        createAuthor(name: $name) {
            id
            name
            createdAt
        }
    }
`;

export const deleteAuthorMutation = gql`
    mutation deleteAuthor($id: Int!) {
        deleteAuthor(id: $id) {
            id
        }
    }
`;

export const createDownloadMutation = gql`
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

export const editDownloadMutation = gql`
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

export const deleteDownloadMutation = gql`
    mutation deleteDownload($id: Int!) {
        deleteDownload(id: $id) {
            id
        }
    }
`;

export const createNewsArticleMutation = gql`
    mutation createNewsArticle($input: NewsArticleInput!) {
        createNewsArticle(input: $input) {
            id
            title
            content
            createdAt
            updatedAt
            author {
                id
                name
            }
        }
    }
`;


export const deleteNewsArticleMutation = gql`
    mutation deleteNewsArticle($id: Int!) {
        deleteNewsArticle(id: $id) {
            id
        }
    }
`;

export const updateNewsArticleMutation = gql`
    mutation editNewsArticle($input: NewsArticleInput!) {
        editNewsArticle(input: $input) {
            id
            title
            content
            createdAt
            author {
                id
                name
            }
        }
    }
`;
