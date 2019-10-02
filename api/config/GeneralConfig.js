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
    ACCOUNT_NAME: 'act_name',
    CHARACTER_NAME: 'cha_name',
    CHARACTER_ID: 'cha_id',
  },

  DOWNLOAD_SECTIONS: [ 'Client', 'Patch', 'Other' ],
};
