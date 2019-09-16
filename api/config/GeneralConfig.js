export const GeneralConfig = {


  // this decides whether GM/HD accounts should be included in the player ranking
  INCLUDE_ADMIN_IN_RANKING: true,
  MAXIMUM_RANKING_ITEMS: 30,


  // ADMIN-LEVELS
  ADMIN_LEVELS: {
    ADMIN: 'ADMIN',
    HD: 'SITE',
  },

  ACCOUNT_SEARCH_FILTERS: {
    ACCOUNT_NAME: 'name',
    IP_ADDRESS: 'last_login_ip',
    MAC_ADDRESS: 'last_login_mac',
    ACCOUNT_ID: 'id',
  },

  CHARACTER_SEARCH_FILTERS: {
    ACCOUNT_NAME: 'Account Name',
    CHARACTER_NAME: 'Character Name',
    CHARACTER_ID: 'Character ID',
  },

  DOWNLOAD_SECTIONS: [ 'Client', 'Patch', 'Other' ],
};