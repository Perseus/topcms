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
    GAME: 'ADMIN.GAME',
    SITE: 'ADMIN.SITE',
    NEWS: {
      CREATE: 'ADMIN.NEWS.CREATE',
      EDIT: 'ADMIN.NEWS.EDIT',
    }
  },
  USER: {
    DETAILS: 'USER.DETAILS',
  }
};

export default RouteNames;
