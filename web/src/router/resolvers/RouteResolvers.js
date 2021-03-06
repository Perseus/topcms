import find from 'lodash/find';

import RouteNames from '../../config/RouteNames';
import store from '../../store/store';
import ActionTypes from '../../store/types/ActionTypes';
import Logger from '../../services/Logger';

const RouteResolvers = {

  [ RouteNames.ROOT.__ROOT__ ]: async( route ) => {
    if ( store.state.application.isAppLoaded ) {
      return true;
    }

    await store.dispatch( ActionTypes.bootstrapApplication, { route } );
    return true;
  },

  [ RouteNames.ROOT.__LANDING__ ]: async() => true,

  [ RouteNames.ADMIN.NEWS.CREATE ]: async( route ) => {
    const { site } = store.state;
    if ( site.authors.length === 0 ) {
      await store.dispatch( ActionTypes.getSiteAuthors, { route } );
      return true;
    }

    return true;
  },

  [ RouteNames.ADMIN.NEWS.EDIT ]: async( route ) => {
    try {
      const { site } = store.state;
      const { to } = route;
      const { params: { id } } = to;

      if ( site.authors.length === 0 ) {
        await store.dispatch( ActionTypes.getSiteAuthors );
      }

      let doesNewsItemExist = find( site.news, newsArticle => newsArticle.id === id );
      if ( doesNewsItemExist ) {
        return true;
      }

      await store.dispatch( ActionTypes.getSiteNewsArticle, { id: Number( id ) } );
      doesNewsItemExist = find( site.news, newsArticle => newsArticle.id === Number( id ) );
      if ( !doesNewsItemExist ) {
        return { name: RouteNames.ADMIN.SITE };
      }

      return true;
    } catch ( err ) {
      Logger.log( `error at ADMIN.NEWS.EDIT: ${err} ` );
      return { name: RouteNames.ADMIN.SITE };
    }
  },

  [ RouteNames.ROOT.NEWS.ARTICLE ]: async( route ) => {
    try {
      const { to } = route;
      const { site } = store.state;
      const { params: { id } } = to;

      const { news } = site;
      let newsItem = find( news, { id } );
      if ( !newsItem ) {
        await store.dispatch( ActionTypes.getSiteNewsArticle, { id: Number( id ) } );
      }

      newsItem = find( news, { id } );
      if ( !newsItem ) {
        return { name: RouteNames.ROOT.__LANDING__ };
      }

      return true;
    } catch ( err ) {
      Logger.log( `error at resolver NEWS : ${err} ` );
      return { name: RouteNames.ROOT.__LANDING__ };
    }
  },

  [ RouteNames.ROOT.NEWS.LIST ]: async() => {
    try {
      await store.dispatch( ActionTypes.getSiteNewsFeed );
      return true;
    } catch ( err ) {
      Logger.log( `error at resolver NEWS.LIST : ${err}` );
      return { name: RouteNames.ROOT.__LANDING__ };
    }
  },

  [ RouteNames.ADMIN.GAME.ACCOUNTS ]: async() => {
    try {
      const { admin } = store.state;
      if ( admin.filteredAccountData.hasFetchedFilteredAccounts ) {
        return true;
      }
      return { name: RouteNames.ADMIN.GAME.INDEX };
    } catch ( err ) {
      return { name: RouteNames.ADMIN.GAME.INDEX };
    }
  },

  [ RouteNames.ADMIN.GAME.ACCOUNT ]: async( route ) => {
    try {
      await store.dispatch( ActionTypes.retrieveAccountData, { id: route.to.params.id } );
      return true;
    } catch ( err ) {
      return { name: RouteNames.ADMIN.GAME.INDEX };
    }
  },

  [ RouteNames.ADMIN.GAME.CHARACTERS ]: async() => {
    try {
      const { admin } = store.state;
      if ( admin.filteredCharacterData.hasFetchedFilteredCharacters ) {
        return true;
      }
      return { name: RouteNames.ADMIN.GAME.INDEX };
    } catch ( err ) {
      return { name: RouteNames.ADMIN.GAME.INDEX };
    }
  },

  [ RouteNames.ADMIN.GAME.CHARACTER ]: async( route ) => {
    try {
      await store.dispatch( ActionTypes.retrieveCharacter, { id: Number( route.to.params.id ) } );
      return true;
    } catch ( err ) {
      return { name: RouteNames.ADMIN.GAME.INDEX };
    }
  },

  [ RouteNames.ADMIN.COMMERCE.CATEGORIES ]: async() => {
    try {
      await store.dispatch( ActionTypes.retrieveMallCategories );
      return true;
    } catch ( err ) {
      return { name: RouteNames.ADMIN.GAME.INDEX };
    }
  },

  [ RouteNames.ADMIN.COMMERCE.ITEMS ]: async() => {
    try {
      await store.dispatch( ActionTypes.retrieveMallCategories );
      await store.dispatch( ActionTypes.retrieveMallItems );

      return true;
    } catch ( err ) {
      return { name: RouteNames.ADMIN.GAME.INDEX };
    }
  },

  [ RouteNames.COMMERCE.AWARD_CENTER ]: async() => {
    try {
      await store.dispatch( ActionTypes.retrieveMallCategories );
      await store.dispatch( ActionTypes.retrieveMallItems );

      return true;
    } catch ( err ) {
      return false;
    }
  },

  [ RouteNames.COMMERCE.ITEM_MALL ]: async() => {
    try {
      await store.dispatch( ActionTypes.retrieveMallCategories );
      await store.dispatch( ActionTypes.retrieveMallItems );

      return true;
    } catch ( err ) {
      return false;
    }
  },

  [ RouteNames.USER.STORAGE_BOX ]: async() => {
    try {
      await store.dispatch( ActionTypes.getStorageBox );

      return true;
    } catch ( err ) {
      return { name: RouteNames.ROOT.__LANDING__ };
    }
  },
};

export default RouteResolvers;
