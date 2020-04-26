import gql from 'graphql-tag';
import { commonQueryFields } from '../../../utils';

export const getAuthorsQuery = gql`
    query getAuthors {
        authors {
            id
            name
            createdAt
        }
    }
`;

export const getDownloadsQuery = gql`
    query getDownloads {
        downloads {
            id
            title
            url
            section
            description
            version
            author {
                id
                name
            }
            createdAt
        }
    }
`;

// TODO: streamline the single/multiple result queries

export const getNewsArticlesQuery = gql`
    query getNewsArticles {
        newsArticles {
            id
            title
            content
            author {
                id
                name
            }
            createdAt
        }
    }
`;

// export const getAuthorQuery = gql``;

// export const getDownloadQuery = gql``;

export const getNewsArticleQuery = gql`
    query getNewsArticle($id: Int!) {
        newsArticle(id: $id) {
            id
            title
            content
            author {
                id
                name
            }
            createdAt
        }
    }
`;

export const getNewsFeedQuery = gql`
    query getNewsFeed($offset: Int, $limit: Int) {
        newsFeed(offset: $offset, limit: $limit) {
            ${commonQueryFields()}
            data {
                articles {
                        id
                        title
                        createdAt
                        updatedAt
                        content
                        author {
                            id
                            name
                        }
                    }
                offset
                total_articles
            }
        }
    }
`;
