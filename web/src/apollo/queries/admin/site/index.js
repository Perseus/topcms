import gql from 'graphql-tag';
import { commonQueryFields } from '../../../utils';

export const getAuthorsQuery = gql`
    query getAuthors {
        authors {
            ${commonQueryFields()}
            data {
                id
                name
                createdAt
            }
        }
    }
`;

export const getDownloadsQuery = gql`
    query getDownloads {
        downloads {
            ${commonQueryFields()}
            data {
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
    }
`;

// TODO: streamline the single/multiple result queries

export const getNewsArticlesQuery = gql`
    query getNewsArticles {
        newsArticles {
            ${commonQueryFields()}
            data {
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
    }
`;

// export const getAuthorQuery = gql``;

// export const getDownloadQuery = gql``;

export const getNewsArticleQuery = gql`
    query getNewsArticle($id: Int!) {
        newsArticle(id: $id) {
            ${commonQueryFields()}
            data {
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

export const getServerDetailStructureInformation = gql`
    query getServerDetailStructureInformation {

        gameStats {
            ${commonQueryFields()}
            data {
                accounts
                characters
                online
                onlineRecord
            }
        }

        newsFeed(offset: 0, limit: 5) {
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

        staffStatuses {
            ${commonQueryFields()}
            data {
                name
                type
                is_online
            }
        }

        serverRateInfo {
            ${commonQueryFields()}
            data {
                solo
                party
                fairy
                ship
                drop
            }
        }
    }
`;
