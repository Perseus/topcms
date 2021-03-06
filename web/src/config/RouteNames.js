const RouteNames = {
  ROOT: {
    __LANDING__: '__LANDING__',
    __ROOT__: '__ROOT__',
    NEWS: {
      __LANDING__: 'ROOT.NEWS.__LANDING__',
      LIST: 'ROOT.NEWS.LIST',
      ARTICLE: 'ROOT.NEWS.ARTICLE',
    },
    DOWNLOAD: {
      LIST: 'ROOT.DOWNLOADS.LIST',
    },
    RANKING: {
      __LANDING__: 'ROOT.RANKING.__LANDING__',
    }
  },
  AUTH: {
    LOGIN: 'AUTH.LOGIN',
    REGISTER: 'AUTH.REGISTER',
  },
  ADMIN: {
    DASHBOARD: 'ADMIN.DASHBOARD',
    GAME: {
      INDEX: 'ADMIN.GAME.INDEX',
      ACCOUNTS: 'ADMIN.GAME.ACCOUNTS',
      ACCOUNT: 'ADMIN.GAME.ACCOUNT',
      CHARACTERS: 'ADMIN.GAME.CHARACTERS',
      CHARACTER: 'ADMIN.GAME.CHARACTER',
    },
    COMMERCE: {
      CATEGORIES: 'ADMIN.COMMERCE.CATEGORIES',
      ITEMS: 'ADMIN.COMMERCE.ITEMS'
    },
    SITE: 'ADMIN.SITE',
    NEWS: {
      CREATE: 'ADMIN.NEWS.CREATE',
      EDIT: 'ADMIN.NEWS.EDIT',
    }
  },
  USER: {
    DETAILS: 'USER.DETAILS',
    STORAGE_BOX: 'USER.STORAGE_BOX',
  },
  COMMERCE: {
    ITEM_MALL: 'COMMERCE.ITEM_MALL',
    AWARD_CENTER: 'COMMERCE.AWARD_CENTER',
  }
};

export default RouteNames;
