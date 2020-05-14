import gql from 'graphql-tag';
import { commonQueryFields } from '../../utils';

export const updateAuthorMutation = gql`
    mutation updateAuthor($id: Int!, $name: String!) {
        editAuthor(id: $id, name: $name) {
            ${commonQueryFields()}
            data {
                id
                name
            }
        }
    }
`;

export const createAuthorMutation = gql`
    mutation createAuthor($name: String!) {
        createAuthor(name: $name) {
            ${commonQueryFields()}
            data {
                id
                name
                createdAt
            }
        }
    }
`;

export const deleteAuthorMutation = gql`
    mutation deleteAuthor($id: Int!) {
        deleteAuthor(id: $id) {
            ${commonQueryFields()}
            data {
                id
            }
        }
    }
`;

export const createDownloadMutation = gql`
    mutation createDownload($title: String!, $url: String!, $author: Int!, $section: String!, $description: String!, $version: String!) {
        createDownload(title: $title, url: $url, author: $author, section: $section, description: $description, version: $version) {
            ${commonQueryFields()}
            data {
                id
                title
                url
                description
                version
                section
                createdAt
                author {
                    id
                    name
                }
            }
        }
    }
`;

export const editDownloadMutation = gql`
    mutation editDownload($id: Int!, $title: String!, $url: String!, $author: Int!, $section: String!, $description: String!, $version: String!) {
        editDownload(id: $id, title: $title, url: $url, author: $author, section: $section, description: $description, version: $version) {
            ${commonQueryFields()}
            data {
                id
                title
                url
                description
                version
                section
                createdAt
                author {
                    id
                    name
                }
            }
        }
    }
`;

export const deleteDownloadMutation = gql`
    mutation deleteDownload($id: Int!) {
        deleteDownload(id: $id) {
            ${commonQueryFields()}
            data {
                id
            }
        }
    }
`;

export const createNewsArticleMutation = gql`
    mutation createNewsArticle($input: NewsArticleInput!) {
        createNewsArticle(input: $input) {
            ${commonQueryFields()}
            data {
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
    }
`;


export const deleteNewsArticleMutation = gql`
    mutation deleteNewsArticle($id: Int!) {
        deleteNewsArticle(id: $id) {
            ${commonQueryFields()}
            data {
                id
            }
        }
    }
`;

export const updateNewsArticleMutation = gql`
    mutation editNewsArticle($input: NewsArticleInput!) {
        editNewsArticle(input: $input) {
            ${commonQueryFields()}
            data {
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
    }
`;
