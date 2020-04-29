import { SnackbarProgrammatic as Snackbar } from 'buefy';

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

const Actions = {
  async [ ActionTypes.getSiteAuthors ]( { commit }, payload ) {
    if ( !payload || !payload.isFetchingAll ) {
      commit( MutationTypes.FETCHING_SITE_INFO );
    }

    try {
      const response = await request.query( getAuthorsQuery );

      commit( MutationTypes.FETCHED_SITE_AUTHORS, { authors: response.data.authors } );
      if ( !payload || !payload.isFetchingAll ) {
        commit( MutationTypes.FETCHED_SITE_INFO );
      }
    } catch ( err ) {
      Logger.log( `error at getSiteAuthors: ${err}` );
    }
  },

  async [ ActionTypes.getSiteDownloads ]( { commit }, payload ) {
    if ( !payload || !payload.isFetchingAll ) {
      commit( MutationTypes.FETCHING_SITE_INFO );
    }

    try {
      const response = await request.query( getDownloadsQuery );

      commit( MutationTypes.FETCHED_SITE_DOWNLOADS, { downloads: response.data.downloads } );
      if ( !payload || !payload.isFetchingAll ) {
        commit( MutationTypes.FETCHED_SITE_INFO );
      }
    } catch ( err ) {
      Logger.log( `error at getSiteDownloads: ${err}` );
    }
  },

  async [ ActionTypes.getSiteNewsArticles ]( { commit }, payload ) {
    if ( !payload || !payload.isFetchingAll ) {
      commit( MutationTypes.FETCHING_SITE_INFO );
    }
    try {
      const response = await request.query( getNewsArticleQuery );

      commit( MutationTypes.FETCHED_SITE_NEWS, { newsArticles: response.data.newsArticles } );
      if ( !payload || !payload.isFetchingAll ) {
        commit( MutationTypes.FETCHED_SITE_INFO );
      }
    } catch ( err ) {
      Logger.log( `error at getSiteAuthors: ${err}` );
    }
  },

  async [ ActionTypes.getAllSiteInfo ]( { commit, dispatch, state } ) {
    commit( MutationTypes.FETCHING_SITE_INFO );
    await dispatch( ActionTypes.getSiteAuthors, { isFetchingAll: true } );
    await dispatch( ActionTypes.getSiteDownloads, { isFetchingAll: true } );
    await dispatch( ActionTypes.getSiteNewsArticles, { isFetchingAll: true } );
    commit( MutationTypes.FETCHED_SITE_INFO );
  },

  async [ ActionTypes.createSiteAuthor ]( { commit }, payload ) {
    const { name } = payload;

    try {
      const response = await request.mutation( createAuthorMutation, {
        name
      } );
      const author = response.data.createAuthor;

      commit( MutationTypes.CREATED_SITE_INFO, { type: 'author', data: author } );
    } catch ( err ) {
      const extractedErrors = extractGraphQLErrors( err );
      commit( MutationTypes.CREATED_SITE_INFO, { type: 'author', hasError: true, error: extractedErrors } );
    }
  },

  async [ ActionTypes.deleteSiteAuthor ]( { commit }, payload ) {
    const { id } = payload;
    try {
      await request.mutation( deleteAuthorMutation, {
        id
      } );


      Snackbar.open( {
        message: 'Author successfully deleted',
        type: 'is-success',
        position: 'is-top',
        duration: 2000,
      } );

      commit( MutationTypes.DELETED_SITE_INFO, { type: 'author', id } );
    } catch ( err ) {
      const extractedErrors = extractGraphQLErrors( err );
      commit( MutationTypes.DELETED_SITE_INFO, { type: 'author', hasError: true, error: extractedErrors } );
    }
  },

  async [ ActionTypes.updateSiteAuthor ]( { commit }, payload ) {
    const { id, name } = payload;
    try {
      await request.mutation( updateAuthorMutation, {
        id,
        name
      } );
      commit( MutationTypes.UPDATED_SITE_INFO, { type: 'author', id, name } );

      Snackbar.open( {
        message: 'Author successfully updated',
        type: 'is-success',
        position: 'is-top',
        duration: 2000,
      } );
    } catch ( err ) {
      const extractedErrors = extractGraphQLErrors( err );
      Logger.log( err, 'error' );
      commit( MutationTypes.UPDATED_SITE_INFO, { type: 'author', hasError: true, error: extractedErrors } );
    }
  },

  async [ ActionTypes.createSiteDownload ]( { commit }, payload ) {
    try {
      const {
        name, link, author, section, description, version
      } = payload;

      const response = await request.mutation( createDownloadMutation, {
        title: name,
        url: link,
        author,
        section,
        description,
        version
      } );

      commit( MutationTypes.CREATED_SITE_INFO, { type: 'download', data: response.data.createDownload } );

      Snackbar.open( {
        message: 'Download successfully created',
        type: 'is-success',
        position: 'is-top',
        duration: 2000,
      } );
    } catch ( err ) {
      Logger.log( `error at createSiteDownload: ${err}`, 'error' );
      commit( MutationTypes.CREATED_SITE_INFO, { hasError: true, error: err, type: 'download' } );
    }
  },

  async [ ActionTypes.updateSiteDownload ]( { commit }, payload ) {
    try {
      const {
        id, title, author, url, section, description, version
      } = payload;

      const response = await request.mutation( editDownloadMutation, {
        id,
        title,
        author: author.id,
        url,
        section,
        description,
        version
      } );

      Snackbar.open( {
        message: 'Download successfully updated',
        type: 'is-success',
        position: 'is-top',
        duration: 2000,
      } );

      commit( MutationTypes.UPDATED_SITE_INFO, {
        type: 'download', id, title, url, author: response.data.editDownload.author, section, description, version,
      } );
    } catch ( err ) {
      Logger.log( `Error at ${ActionTypes.updateSiteDownload} action: ${err}` );
      commit( MutationTypes.UPDATED_SITE_INFO, {
        type: 'download', hasError: true, error: err
      } );
    }
  },

  async [ ActionTypes.deleteSiteDownload ]( { commit }, payload ) {
    try {
      const { id } = payload;
      commit( MutationTypes.DELETING_SITE_INFO, { type: 'download' } );
      try {
        await request.mutation( deleteDownloadMutation, {
          id
        } );

        commit( MutationTypes.DELETED_SITE_INFO, { type: 'download', id } );

        Snackbar.open( {
          message: 'Download successfully deleted',
          type: 'is-success',
          position: 'is-top',
          duration: 2000,
        } );
      } catch ( err ) {
        const extractedErrors = extractGraphQLErrors( err );
        commit( MutationTypes.DELETED_SITE_INFO, { type: 'download', hasError: true, error: extractedErrors } );
      }
    } catch ( err ) {
      Logger.log( `error at deleteSiteDownload: ${err}` );
    }
  },

  async [ ActionTypes.createSiteNews ]( { commit, dispatch }, payload ) {
    try {
      const { title, content, author } = payload;

      const response = await request.mutation( createNewsArticleMutation, {
        input: {
          title,
          content,
          author
        }
      } );

      commit( MutationTypes.CREATED_SITE_INFO, { type: 'news', data: response.data.createNewsArticle } );
      Snackbar.open( {
        message: 'News article successfully created',
        type: 'is-success',
        position: 'is-top',
        duration: 2000
      } );

      dispatch( ActionTypes.changeRoute, { name: RouteNames.ADMIN.SITE } );
    } catch ( err ) {
      Logger.log( `error at createSiteNews: ${err}` );
      Snackbar.open( {
        message: 'There was an error while trying to create the news article',
        type: 'is-danger',
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

      const response = await request.mutation( updateNewsArticleMutation, {
        input: {
          id: Number( id ),
          title,
          content,
          author
        }
      } );

      Snackbar.open( {
        message: 'News Article successfully updated',
        type: 'is-success',
        position: 'is-top',
        duration: 2000,
      } );

      commit( MutationTypes.UPDATED_SITE_INFO, {
        type: 'news', id, title, content, author: response.data.editNewsArticle.author
      } );
      dispatch( ActionTypes.changeRoute, { name: RouteNames.ADMIN.SITE } );
    } catch ( err ) {
      Logger.log( `Error at updateSiteNews: ${err} ` );
      Snackbar.open( {
        message: 'There was an error while trying to update the news article',
        type: 'is-danger',
        position: 'is-top',
        duration: 4000
      } );
    }
  },

  async [ ActionTypes.deleteSiteNews ]( { commit }, payload ) {
    try {
      const { id } = payload;

      await request.mutation( deleteNewsArticleMutation, {
        id
      } );

      commit( MutationTypes.DELETED_SITE_INFO, { type: 'news', id } );

      Snackbar.open( {
        message: 'News Article successfully deleted',
        type: 'is-success',
        position: 'is-top',
        duration: 2000
      } );
    } catch ( err ) {
      const extractedErrors = extractGraphQLErrors( err );
      commit( MutationTypes.DELETED_SITE_INFO, { type: 'news', hasError: true, error: extractedErrors } );
      Logger.log( `error at deleteSiteNews: ${err}` );
      Snackbar.open( {
        message: 'There was an error while trying to delete the news article',
        type: 'is-danger',
        position: 'is-top',
        duration: 4000
      } );
    }
  },

  async [ ActionTypes.getSiteNewsArticle ]( { commit }, payload ) {
    try {
      const { id } = payload;

      const response = await request.query( getNewsArticleQuery, 'getNewsArticle', {
        id
      } );
      commit( MutationTypes.FETCHED_SITE_NEWS, { newsArticle: response.data.newsArticle } );
      commit( MutationTypes.FETCHED_SITE_INFO );
    } catch ( err ) {
      Logger.log( `error at Action getSiteNewsArticle: ${err}` );
    }
  }
};

export default Actions;
