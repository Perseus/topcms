import Logger from '../../../services/Logger';
import MutationTypes from '../../types/MutationTypes';
import ActionTypes from '../../types/ActionTypes';
import RouteNames from '../../../config/RouteNames';
import {
  getAuthorsQuery, getDownloadsQuery, getNewsArticlesQuery, getNewsArticleQuery
} from '../../../apollo/queries/admin/site';
import {
  createAuthorMutation, deleteAuthorMutation, updateAuthorMutation, createDownloadMutation, editDownloadMutation, deleteDownloadMutation, createNewsArticleMutation, deleteNewsArticleMutation, updateNewsArticleMutation
} from '../../../apollo/mutations/site';
import { extractGraphQLErrors } from '../../../utils/ErrorExtractor';
import request from '../../../services/GraphQLRequest';
import { handleSiteItemCreationErrors } from '../../helpers/site';


const Actions = {
  async [ ActionTypes.getSiteAuthors ]( { commit } ) {
    try {
      const { authors: authorsResponse } = await request.query( getAuthorsQuery, null, {
        fetchPolicy: 'network-only'
      } );

      commit( MutationTypes.FETCHED_SITE_AUTHORS, { authors: authorsResponse.data } );
    } catch ( err ) {
      Logger.log( `error at getSiteAuthors: ${err}` );
    }
  },

  async [ ActionTypes.getSiteDownloads ]( { commit } ) {
    try {
      const { downloads: downloadsResponse } = await request.query( getDownloadsQuery, null, {
        fetchPolicy: 'network-only'
      } );

      commit( MutationTypes.FETCHED_SITE_DOWNLOADS, { downloads: downloadsResponse.data } );
    } catch ( err ) {
      Logger.log( `error at getSiteDownloads: ${err}` );
    }
  },

  async [ ActionTypes.getSiteNewsArticles ]( { commit } ) {
    try {
      const { newsArticles: response } = await request.query( getNewsArticlesQuery, null, {
        fetchPolicy: 'network-only'
      } );

      commit( MutationTypes.FETCHED_SITE_NEWS, { newsArticles: response.data } );
    } catch ( err ) {
      Logger.log( `error at getSiteNewsArticles: ${err}` );
    }
  },

  async [ ActionTypes.getAllSiteInfo ]( { dispatch } ) {
    await dispatch( ActionTypes.getSiteAuthors );
    await dispatch( ActionTypes.getSiteDownloads );
    await dispatch( ActionTypes.getSiteNewsArticles );
  },

  async [ ActionTypes.createSiteAuthor ]( { commit, dispatch }, payload ) {
    const { name } = payload;

    try {
      const { createAuthor: createAuthorResponse } = await request.mutation( createAuthorMutation, {
        name
      } );

      commit( MutationTypes.CREATED_SITE_INFO, { type: 'author', data: createAuthorResponse.data } );
    } catch ( err ) {
      handleSiteItemCreationErrors( err, '', { dispatch } );
    }
  },

  async [ ActionTypes.deleteSiteAuthor ]( { commit, dispatch }, payload ) {
    const { id } = payload;
    try {
      await request.mutation( deleteAuthorMutation, {
        id
      } );

      dispatch( ActionTypes.triggerToast, {
        content: 'Author successfully deleted',
        type: 'success',
        duration: 2000,
      } );

      commit( MutationTypes.DELETED_SITE_INFO, { type: 'author', id } );
    } catch ( err ) {
      if ( err.code === 'db.FK_CONSTRAINT' ) {
        dispatch( ActionTypes.triggerToast, {
          content: 'There are other news articles or downloads that were created by this author. Please delete those before deleting the author.',
          type: 'error',
          duration: 5000
        } );
      }
    }
  },

  async [ ActionTypes.updateSiteAuthor ]( { commit, dispatch }, payload ) {
    const { id, name } = payload;
    try {
      await request.mutation( updateAuthorMutation, {
        id,
        name
      } );
      commit( MutationTypes.UPDATED_SITE_INFO, { type: 'author', id, name } );

      dispatch( ActionTypes.triggerToast, {
        content: 'Author successfully updated',
        type: 'success',
        position: 'is-top',
        duration: 2000,

      } );
    } catch ( err ) {
      Logger.log( err, 'error' );
    }
  },

  async [ ActionTypes.createSiteDownload ]( { commit, dispatch }, payload ) {
    try {
      const {
        name, link, author, section, description, version
      } = payload;

      const { createDownload: response } = await request.mutation( createDownloadMutation, {
        title: name,
        url: link,
        author,
        section,
        description,
        version
      } );

      commit( MutationTypes.CREATED_SITE_INFO, { type: 'download', data: response.data } );

      dispatch( ActionTypes.triggerToast, {
        content: 'Download successfully created',
        type: 'success',
        position: 'is-top',
        duration: 2000,
      } );
    } catch ( err ) {
      Logger.log( `error at createSiteDownload: ${err}`, 'error' );

      handleSiteItemCreationErrors( err, 'download', { dispatch } );
    }
  },

  async [ ActionTypes.updateSiteDownload ]( { commit, dispatch }, payload ) {
    try {
      const {
        id, title, author, url, section, description, version
      } = payload;

      const { editDownload: response } = await request.mutation( editDownloadMutation, {
        id,
        title,
        author: author.id,
        url,
        section,
        description,
        version
      } );

      dispatch( ActionTypes.triggerToast, {
        content: 'Download successfully updated',
        type: 'success',
        position: 'is-top',
        duration: 2000,

      } );

      commit( MutationTypes.UPDATED_SITE_INFO, {
        type: 'download', id, title, url, author: response.data.author, section, description, version,
      } );
    } catch ( err ) {
      Logger.log( `Error at ${ActionTypes.updateSiteDownload} action: ${err}` );
      commit( MutationTypes.UPDATED_SITE_INFO, {
        type: 'download', hasError: true, error: err
      } );
    }
  },

  async [ ActionTypes.deleteSiteDownload ]( { commit, dispatch }, payload ) {
    const { id } = payload;
    try {
      await request.mutation( deleteDownloadMutation, {
        id
      } );

      commit( MutationTypes.DELETED_SITE_INFO, { type: 'download', id } );

      dispatch( ActionTypes.triggerToast, {
        content: 'Download successfully deleted',
        type: 'success',
        position: 'is-top',
        duration: 2000,
      } );
    } catch ( err ) {
      const extractedErrors = extractGraphQLErrors( err );
      commit( MutationTypes.DELETED_SITE_INFO, { type: 'download', hasError: true, error: extractedErrors } );
    }
  },

  async [ ActionTypes.createSiteNews ]( { commit, dispatch }, payload ) {
    try {
      const { title, content, author } = payload;

      const { createNewsArticle: response } = await request.mutation( createNewsArticleMutation, {
        input: {
          title,
          content,
          author
        }
      } );

      commit( MutationTypes.CREATED_SITE_INFO, { type: 'news', data: response.data } );

      dispatch( ActionTypes.triggerToast, {
        content: 'News article successfully created',
        type: 'success',
        position: 'is-top',
        duration: 2000
      } );

      dispatch( ActionTypes.changeRoute, { name: RouteNames.ADMIN.SITE } );
    } catch ( err ) {
      Logger.log( `error at createSiteNews: ${err}` );
      dispatch( ActionTypes.triggerToast, {
        content: 'There was an error while trying to create the news article',
        type: 'error',
        position: 'is-top',
        duration: 4000
      } );
    }
  },

  async [ ActionTypes.updateSiteNews ]( { commit, dispatch }, payload ) {
    try {
      const {
        id, title, content, author
      } = payload;

      const { editNewsArticle: response } = await request.mutation( updateNewsArticleMutation, {
        input: {
          id: Number( id ),
          title,
          content,
          author
        }
      } );

      dispatch( ActionTypes.triggerToast, {
        content: 'News Article successfully updated',
        type: 'success',
        position: 'is-top',
        duration: 2000,
      } );

      commit( MutationTypes.UPDATED_SITE_INFO, {
        type: 'news', id, title, content, author: response.data.author
      } );
      dispatch( ActionTypes.changeRoute, { name: RouteNames.ADMIN.SITE } );
    } catch ( err ) {
      Logger.log( `Error at updateSiteNews: ${err} ` );

      dispatch( ActionTypes.triggerToast, {
        content: 'There was an error while trying to update the news article',
        type: 'error',
        position: 'is-top',
        duration: 4000
      } );
    }
  },

  async [ ActionTypes.deleteSiteNews ]( { commit, dispatch }, payload ) {
    try {
      const { id } = payload;

      await request.mutation( deleteNewsArticleMutation, {
        id
      } );

      commit( MutationTypes.DELETED_SITE_INFO, { type: 'news', id } );

      dispatch( ActionTypes.triggerToast, {
        content: 'News Article successfully deleted',
        type: 'success',
        position: 'is-top',
        duration: 2000
      } );
    } catch ( err ) {
      const extractedErrors = extractGraphQLErrors( err );
      commit( MutationTypes.DELETED_SITE_INFO, { type: 'news', hasError: true, error: extractedErrors } );
      Logger.log( `error at deleteSiteNews: ${err}` );

      dispatch( ActionTypes.triggerToast, {
        content: 'There was an error while trying to delete the news article',
        type: 'error',
        position: 'is-top',
        duration: 4000
      } );
    }
  },

  async [ ActionTypes.getSiteNewsArticle ]( { commit }, payload ) {
    try {
      const { id } = payload;

      const { newsArticle: response } = await request.query( getNewsArticleQuery, {
        id
      } );
      commit( MutationTypes.FETCHED_SITE_NEWS, { newsArticle: response.data } );
      commit( MutationTypes.FETCHED_SITE_INFO );
    } catch ( err ) {
      Logger.log( `error at Action getSiteNewsArticle: ${err}` );
    }
  }
};

export default Actions;
