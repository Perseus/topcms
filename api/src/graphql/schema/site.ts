import { gql } from 'apollo-server-express';
import { getCommonResponseFields } from '../utils/schema';

export const typeDefs = gql`
  extend type Query {
    newsArticles: NewsArticlesResponse
    newsFeed(offset: Int, limit: Int): NewsFeedResponse
    author(id: Int!): AuthorResponse
    authors: AuthorsResponse
    downloads: DownloadsResponse
    polls: [Poll] @isAuthenticated(role: SITE)
    newsArticle(id: Int): NewsArticleResponse
    download(id: Int!): DownloadResponse
  }

  extend type Mutation {
    createAuthor(name: String!): AuthorResponse @isAuthenticated(role: SITE)
    createNewsArticle(input: NewsArticleInput!): NewsArticleResponse @isAuthenticated(role: SITE)
    createDownload(title: String!, url: String!, author: Int!, section: String!, description: String!, version: String!): DownloadResponse @isAuthenticated(role: SITE)
    createPoll(title: String!, options: String!, author: Int!): Poll @isAuthenticated(role: SITE)
    editAuthor(id: Int!, name: String!): AuthorResponse @isAuthenticated(role: SITE)
    editNewsArticle(input: NewsArticleInput!): NewsArticleResponse @isAuthenticated(role: SITE)
    editDownload(id: Int!, title: String, url: String, author: Int, section: String, description: String, version: String): DownloadResponse
    deleteAuthor(id: Int!): AuthorResponse @isAuthenticated(role: SITE)
    deleteDownload(id: Int!): DownloadResponse @isAuthenticated(role: SITE)
    deleteNewsArticle(id: Int!): NewsArticleResponse @isAuthenticated(role: SITE)
    cacheItemInfo: [ ItemInfoObject ] @isAuthenticated(role: ADMIN)
  }

  type NewsArticlesResponse {
    ${getCommonResponseFields()}
    data: [NewsArticle]
  }

  type DownloadResponse {
    ${getCommonResponseFields()}
    data: Download
  }

  type DownloadsResponse {
    ${getCommonResponseFields()}
    data: [Download]
  }

  type ItemInfoObject {
    id: Int
    name: String
    icon: String
  }

  type Download {
    id: Int
    title: String
    url: String
    section: String
    version: String
    description: String
    createdAt: String
    updatedAt: String
    author: Author
    traits: [String]
  }

  type NewsArticle {
    id: Int
    title: String
    content: String
    createdAt: String
    updatedAt: String
    author: Author
  }

  input NewsArticleInput {
    id: Int
    title: String! @constraint(minLength: 4)
    content: String! @constraint(minLength: 10)
    author: Int!
  }

  type NewsArticleResponse {
    ${getCommonResponseFields()}
    data: NewsArticle
  }

  type NewsFeedResponse {
    ${getCommonResponseFields()}
    data: NewsFeed
  }

  type NewsFeed {
    offset: Int
    articles: [NewsArticle]
    total_articles: Int
  }

  type AuthorResponse {
    ${getCommonResponseFields()}
    data: Author
  }

  type AuthorsResponse {
    ${getCommonResponseFields()}
    data: [Author]
  }

  type Poll {
    id: Int
    title: String
    options: String
    votes: String
    createdAt: String
    updatedAt: String
    author: Author
  }

  type Author {
    id: Int
    name: String
    createdAt: String
    updatedAt: String
    downloads: [Download]
    news_articles: [NewsArticle]
    polls: [Poll]
  }
`;
