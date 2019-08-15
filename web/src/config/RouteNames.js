const RouteNames = {
  ROOT: {
    __LANDING__: '__LANDING__',
    __ROOT__: '__ROOT__',
    NEWS: {
      LIST: 'ROOT.NEWS.LIST',
      ARTICLE: 'ROOT.NEWS.ARTICLE',
    },
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
  }
};

export default RouteNames;
