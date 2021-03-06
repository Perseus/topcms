import find from 'lodash/find';
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';

import MutationTypes from '../../types/MutationTypes';

const Mutations = {
  [ MutationTypes.FETCHING_SITE_INFO ]( state ) {
    state.fetchingSiteInfo = true;
  },
  [ MutationTypes.FETCHED_SITE_AUTHORS ]( state, { authors } ) {
    state.authors = authors;
  },
  [ MutationTypes.FETCHED_SITE_DOWNLOADS ]( state, { downloads } ) {
    state.downloads = downloads;
  },
  [ MutationTypes.FETCHED_SITE_NEWS ]( state, { newsArticles, newsArticle } ) {
    if ( newsArticle ) {
      if ( !find( state.news, { id: newsArticle.id } ) ) {
        state.news.push( newsArticle );
      }
    }

    if ( newsArticles ) {
      state.news = newsArticles;
    }
  },
  [ MutationTypes.FETCHED_SITE_INFO ]( state ) {
    state.fetchingSiteInfo = false;
    state.fetchedSiteInfo = true;
  },
  [ MutationTypes.CREATING_SITE_INFO ]( state, payload ) {
    state[ `${payload.type}ProcessingState` ].isCreating = true;
  },
  [ MutationTypes.CREATED_SITE_INFO ]( state, payload ) {
    state[ `${payload.type}ProcessingState` ].isCreating = false;

    const hasError = get( payload, 'hasError', false );
    if ( hasError ) {
      state[ `${payload.type}ProcessingState` ].errors = payload.error;
      return;
    }


    if ( payload.type === 'author' ) {
      state.authors.push( payload.data );
    }

    if ( payload.type === 'download' ) {
      state.downloads.push( payload.data );
    }

    if ( payload.type === 'news' ) {
      state.news.push( payload.data );
    }
  },
  [ MutationTypes.UPDATED_SITE_INFO ]( state, payload ) {
    if ( payload.type === 'author' ) {
      const authorIndex = findIndex( state.authors, author => author.id === payload.id );
      state.authors[ authorIndex ].name = payload.name;
    }

    if ( payload.type === 'download' ) {
      const downloadIndex = findIndex( state.downloads, download => download.id === payload.id );
      Object.assign( state.downloads[ downloadIndex ], payload );
    }

    if ( payload.type === 'news' ) {
      const newsIndex = findIndex( state.news, newsArticle => newsArticle.id === Number( payload.id ) );
      state.news[ newsIndex ].title = payload.title;
      state.news[ newsIndex ].content = payload.content;
      state.news[ newsIndex ].author = payload.author;
    }
  },
  [ MutationTypes.DELETING_SITE_INFO ]( state, payload ) {
    state[ `${payload.type}ProcessingState` ].isDeleting = true;
  },
  [ MutationTypes.DELETED_SITE_INFO ]( state, payload ) {
    state[ `${payload.type}ProcessingState` ].isDeleting = false;

    const hasError = get( payload, 'hasError', false );
    if ( hasError ) {
      state[ `${payload.type}ProcessingState` ].errors = payload.error;
      return;
    }

    if ( payload.type === 'author' ) {
      state.authors = state.authors.filter( author => author.id !== payload.id );
    }

    if ( payload.type === 'download' ) {
      state.downloads = state.downloads.filter( download => download.id !== payload.id );
    }

    if ( payload.type === 'news' ) {
      state.news = state.news.filter( news => news.id !== payload.id );
    }
  },
};

export default Mutations;
