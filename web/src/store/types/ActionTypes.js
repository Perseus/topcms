const ActionTypes = {
  bootstrapApplication: 'bootstrapApplication',
  retrieveLandingPageInformation: 'retrieveLandingPageInformation',
  retrieveStaffOnlineStatus: 'retrieveStaffOnlineStatus',

  registerUser: 'registerUser',
  loginUser: 'loginUser',
  retrieveUser: 'retrieveUser',
  logoutUser: 'logoutUser',
  updateUser: 'updateUser',

  setInitialRoute: 'setInitialRoute',
  changeRoute: 'changeRoute',

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
};

export default ActionTypes;
