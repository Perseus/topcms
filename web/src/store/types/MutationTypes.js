const MutationTypes = {

  // Base application
  APPLICATION_LOADING: 'APPLICATION_LOADING',
  APPLICATION_LOADED: 'APPLICATION_LOADED',
  UPDATE_REQUESTS_IN_PROGRESS: 'UPDATE_REQUESTS_IN_PROGRESS',
  FETCHING_NEWS_FEED: 'FETCHING_NEWS_FEED',
  FETCHED_NEWS_FEED: 'FETCHED_NEWS_FEED',
  FETCHING_STAFF_ONLINE_STATUS: 'FETCHING_STAFF_ONLINE_STATUS',
  FETCHED_STAFF_ONLINE_STATUS: 'FETCHED_STAFF_ONLINE_STATUS',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  SET_ROUTE_RESOLVING_STATUS: 'SET_ROUTE_RESOLVING_STATUS',
  TRIGGER_NEW_TOAST: 'TRIGGER_NEW_TOAST',

  // User Authentication
  REGISTERING_USER: 'REGISTERING_USER',
  REGISTRATION_COMPLETE: 'REGISTRATION_COMPLETE',
  SIGNING_IN_USER: 'SIGNING_IN_USER',
  SIGNIN_COMPLETE: 'SIGNIN_COMPLETE',
  SIGNIN_FAILED: 'SIGNIN_FAILED',

  UPDATED_USER: 'UPDATED_USER',
  // Router
  CHANGE_ROUTE: 'CHANGE_ROUTE',
  CHANGE_ROUTE_WITHOUT_PLUGIN: 'CHANGE_ROUTE_WITHOUT_PLUGIN',

  // Site admin/Site stats
  RETRIEVING_GAME_STATS: 'RETRIEVING_GAME_STATS',
  RETRIEVED_GAME_STATS: 'RETRIEVED_GAME_STATS',
  FETCHING_SITE_INFO: 'FETCHING_SITE_INFO',
  CREATED_SITE_INFO: 'CREATED_SITE_INFO',
  UPDATED_SITE_INFO: 'UPDATED_SITE_INFO',
  DELETING_SITE_INFO: 'DELETING_SITE_INFO',
  DELETED_SITE_INFO: 'DELETED_SITE_INFO',
  FETCHED_SITE_INFO: 'FETCHED_SITE_INFO',
  FETCHED_SITE_AUTHORS: 'FETCHED_SITE_AUTHORS',
  FETCHED_SITE_NEWS: 'FETCHED_SITE_NEWS',
  FETCHED_SITE_DOWNLOADS: 'FETCHED_SITE_DOWNLOADS',
  FETCHING_SERVER_RATES: 'FETCHING_SERVER_RATES',
  FETCHED_SERVER_RATES: 'FETCHED_SERVER_RATES',
  UPDATING_SERVER_RATES: 'UPDATING_SERVER_RATES',


  // Game admin/stats
  RETRIEVING_PLAYER_RANKING: 'RETRIEVING_PLAYER_RANKING',
  RETRIEVED_PLAYER_RANKING: 'RETRIEVED_PLAYER_RANKING',
  RETRIEVING_GUILD_RANKING: 'RETRIEVING_GUILD_RANKING',
  RETRIEVED_GUILD_RANKING: 'RETRIEVED_GUILD_RANKING',
  UPDATE_FILTERED_ACCOUNTS: 'UPDATE_FILTERED_ACCOUNTS',
  UPDATE_FILTERED_CHARACTERS: 'UPDATE_FILTERED_CHARACTERS',
  UPDATE_USER_BAN: 'UPDATE_USER_BAN',
  SET_FETCHED_ACCOUNT_DATA: 'SET_FETCHED_ACCOUNT_DATA',
  SET_UPDATED_USER_DATA: 'SET_UPDATED_USER_DATA',
  SET_FETCHED_CHARACTER_DATA: 'SET_FETCHED_CHARACTER_DATA',
  CACHING_ITEM_INFO: 'CACHING_ITEM_INFO',
  CACHED_ITEM_INFO: 'CACHED_ITEM_INFO',


  FETCHED_COMMERCE_CATEGORIES: 'FETCHED_COMMERCE_CATEGORIES',
  COMMERCE_CATEGORY_CREATED: 'COMMERCE_CATEGORY_CREATED',
  UPDATE_COMMERCE_CATEGORY: 'UPDATE_COMMERCE_CATEGORY',
  DELETE_COMMERCE_CATEGORY: 'DELETE_COMMERCE_CATEGORY',

  FETCHED_MALL_ITEMS: 'FETCHED_MALL_ITEMS',
  CREATE_MALL_ITEM: 'CREATE_MALL_ITEM',
  UPDATE_MALL_ITEM: 'UPATE_MALL_ITEM',
  DELETE_MALL_ITEM: 'DELETE_MALL_ITEM',

  UPDATE_MALL_POINTS: 'UPDATE_MALL_POINTS',

  UPDATE_STORAGE_BOX: 'UPDATE_STORAGE_BOX',

};

export default MutationTypes;
