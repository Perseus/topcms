const ActionTypes = {
  bootstrapApplication: 'bootstrapApplication',
  retrieveLandingPageInformation: 'retrieveLandingPageInformation',
  retrieveStaffOnlineStatus: 'retrieveStaffOnlineStatus',
  connectToSocketServer: 'connectToSocketServer',

  registerUser: 'registerUser',
  loginUser: 'loginUser',
  retrieveUser: 'retrieveUser',
  logoutUser: 'logoutUser',
  updateUser: 'updateUser',

  setInitialRoute: 'setInitialRoute',
  changeRoute: 'changeRoute',
  changeRouteWithoutPlugin: 'changeRouteWithoutPlugin',
  updateRequestsInProgress: 'updateRequestsInProgress',
  toggleModal: 'toggleModal',

  getServerStats: 'getServerStats',
  getSiteAuthors: 'getSiteAuthors',
  getSiteNewsArticles: 'getSiteNewsArticles',
  getSiteDownloads: 'getSiteDownloads',
  getSitePolls: 'getSitePolls',
  getAllSiteInfo: 'getAllSiteInfo',
  getSiteNewsFeed: 'getSiteNewsFeed',
  addItemToNewsFeed: 'addItemToNewsFeed',

  createSiteAuthor: 'createSiteAuthor',
  updateSiteAuthor: 'updateSiteAuthor',
  deleteSiteAuthor: 'deleteSiteAuthor',
  createSiteDownload: 'createSiteDownload',
  updateSiteDownload: 'updateSiteDownload',
  deleteSiteDownload: 'deleteSiteDownload',
  createSiteNews: 'createSiteNews',
  updateSiteNews: 'updateSiteNews',
  deleteSiteNews: 'deleteSiteNews',

  getSiteDownload: 'getSiteDownload',
  getSiteNewsArticle: 'getSiteNewsArticle',
  getSiteAuthor: 'getSiteAuthor',

  fetchServerRates: 'fetchServerRates',
  updateServerRates: 'updateServerRates',

  retrievePlayerRanking: 'retrievePlayerRanking',
  retrieveGuildRanking: 'retrieveGuildRanking',

  retrieveFilteredAccounts: 'retrieveFilteredAccounts',
  retrieveFilteredCharacters: 'retrieveFilteredCharacters',
  toggleBanForUser: 'toggleBanForUser',
  retrieveAccountData: 'retrieveAccountData',
  adminUpdateUserEmail: 'adminUpdateUserEmail',
  adminUpdateUser: 'adminUpdateUser',
  retrieveCharacter: 'retrieveCharacter',
  generateItemInfoCache: 'generateItemInfoCache',
  uploadItemInfo: 'uploadItemInfo',
  resetUserSecurityCode: 'resetUserSecurityCode',

  retrieveMallCategories: 'retrieveMallCategories',
  createMallCategory: 'createMallCategory',
  editMallCategory: 'editMallCategory',
  deleteMallCategory: 'deleteMallCategory',

  retrieveMallItems: 'retrieveMallItems',
  createMallItem: 'createMallItem',
  editMallItem: 'editMallItem',
  deleteMallItem: 'deleteMallItem',

  addMallPoints: 'addMallPoints',
  purchaseMallItem: 'purchaseMallItem',
};

export default ActionTypes;
