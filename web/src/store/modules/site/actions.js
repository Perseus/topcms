import { Snackbar } from 'buefy/dist/components/snackbar';

import Logger from '../../../services/Logger';
import MutationTypes from '../../types/MutationTypes';
import ActionTypes from '../../types/ActionTypes';
import { apolloProvider } from '../../../apollo';
import { getAuthorsQuery, getDownloadsQuery } from '../../../apollo/queries/admin/site';
import {
  createAuthorMutation, deleteAuthorMutation, updateAuthorMutation, createDownloadMutation, editDownloadMutation, deleteDownloadMutation
} from '../../../apollo/mutations/site';
import { extractGraphQLErrors } from '../../../utils/ErrorExtractor';

const Actions = {
  async [ ActionTypes.getSiteAuthors ] ( { commit }, payload ) {
    if ( !payload || !payload.isFetchingAll ) {
      commit( MutationTypes.FETCHING_SITE_INFO );
    }

    try {
      const response = await apolloProvider.defaultClient.query( {
        query: getAuthorsQuery
      } );
      commit( MutationTypes.FETCHED_SITE_AUTHORS, { authors: response.data.authors } );
      if ( !payload || !payload.isFetchingAll ) {
        commit( MutationTypes.FETCHED_SITE_INFO );
      }
    } catch ( err ) {
      console.log( err );
    }
  },

  async [ ActionTypes.getSiteDownloads ] ( { commit }, payload ) {
    if ( !payload || !payload.isFetchingAll ) {
      commit( MutationTypes.FETCHING_SITE_INFO );
    }

    try {
      const response = await apolloProvider.defaultClient.query( {
        query: getDownloadsQuery
      } );
      commit( MutationTypes.FETCHED_SITE_DOWNLOADS, { downloads: response.data.downloads } );
      if ( !payload || !payload.isFetchingAll ) {
        commit( MutationTypes.FETCHING_SITE_INFO );
      }
    } catch ( err ) {
      Logger.log( `error at getSiteDownloads: ${err}` );
    }
  },

  async [ ActionTypes.getAllSiteInfo ] ( { commit, dispatch } ) {
    commit( MutationTypes.FETCHING_SITE_INFO );
    await dispatch( ActionTypes.getSiteAuthors, { isFetchingAll: true } );
    await dispatch( ActionTypes.getSiteDownloads, { isFetchingAll: true } );
    commit( MutationTypes.FETCHED_SITE_INFO );
  },

  async [ ActionTypes.createSiteAuthor ] ( { commit }, payload ) {
    const { name } = payload;
    commit( MutationTypes.CREATING_SITE_INFO, { type: 'author' } );
    try {
      const response = await apolloProvider.defaultClient.mutate( {
        mutation: createAuthorMutation,
        variables: {
          name
        }
      } );

      const author = response.data.createAuthor;

      commit( MutationTypes.CREATED_SITE_INFO, { type: 'author', data: author } );
    } catch ( err ) {
      const extractedErrors = extractGraphQLErrors( err );
      commit( MutationTypes.CREATED_SITE_INFO, { type: 'author', hasError: true, error: extractedErrors } );
    }
  },

  async [ ActionTypes.deleteSiteAuthor ] ( { commit }, payload ) {
    const { id } = payload;
    commit( MutationTypes.DELETING_SITE_INFO, { type: 'author' } );
    try {
      await apolloProvider.defaultClient.mutate( {
        mutation: deleteAuthorMutation,
        variables: {
          id
        }
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

  async [ ActionTypes.updateSiteAuthor ] ( { commit }, payload ) {
    const { id, name } = payload;
    commit( MutationTypes.UPDATING_SITE_INFO, { type: 'author' } );
    try {
      await apolloProvider.defaultClient.mutate( {
        mutation: updateAuthorMutation,
        variables: {
          id,
          name
        }
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
      console.log( err );
      commit( MutationTypes.UPDATED_SITE_INFO, { type: 'author', hasError: true, error: extractedErrors } );
    }
  },

  async [ ActionTypes.createSiteDownload ] ( { commit }, payload ) {
    try {
      const { name, link, author } = payload;
      commit( MutationTypes.CREATING_SITE_INFO, { type: 'download' } );
      try {
        const response = await apolloProvider.defaultClient.mutate( {
          mutation: createDownloadMutation,
          variables: {
            title: name,
            url: link,
            author
          }
        } );
        commit( MutationTypes.CREATED_SITE_INFO, { type: 'download', data: response.data.createDownload } );
        Snackbar.open( {
          message: 'Download successfully created',
          type: 'is-success',
          position: 'is-top',
          duration: 2000,
        } );
      } catch ( err ) {
        Logger.log( `error at createSiteDownload: ${err}` );
      }
    } catch ( err ) {
      Logger.log( `error at createSiteDownload: ${err}`, 'error' );
    }
  },

  async [ ActionTypes.updateSiteDownload ] ( { commit }, payload ) {
    try {
      const {
        id, title, author, url
      } = payload;

      commit( MutationTypes.UPDATING_SITE_INFO, { type: 'download' } );

      const response = await apolloProvider.defaultClient.mutate( {
        mutation: editDownloadMutation,
        variables: {
          id,
          title,
          author: author.id,
          url
        }
      } );

      Snackbar.open( {
        message: 'Download successfully updated',
        type: 'is-success',
        position: 'is-top',
        duration: 2000,
      } );

      commit( MutationTypes.UPDATED_SITE_INFO, {
        type: 'download', id, title, url, author: response.data.editDownload.author
      } );
    } catch ( err ) {
      Logger.log( `Error at ${ActionTypes.updateSiteDownload} action: ${err}` );
    }
  },

  async [ ActionTypes.deleteSiteDownload ] ( { commit }, payload ) {
    try {
      const { id } = payload;
      commit( MutationTypes.DELETING_SITE_INFO, { type: 'download' } );
      try {
        await apolloProvider.defaultClient.mutate( {
          mutation: deleteDownloadMutation,
          variables: {
            id
          }
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
  }
};

export default Actions;
