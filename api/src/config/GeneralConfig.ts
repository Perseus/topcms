interface CharacterSearchFilters {
 [index: string]: string;
  ACCOUNT_NAME: string;
  CHARACTER_NAME: string;
  CHARACTER_ID: string;
}

interface AccountSearchFilters {
  [index: string]: string;
  ACCOUNT_NAME: string;
  IP_ADDRESS: string;
  MAC_ADDRESS: string;
  ACCOUNT_ID: string;
}

interface PlayerRankingFilters {
  [index: string]: string;
  GOLD: string;
  LEVEL: string;
}

interface AdminLevels {
  [index: string]: string;
  ADMIN: string;
  HD: string;
}

export const AccountSearchFilters: AccountSearchFilters = {
  ACCOUNT_NAME: 'name',
  IP_ADDRESS: 'last_login_ip',
  MAC_ADDRESS: 'last_login_mac',
  ACCOUNT_ID: 'id',
};

export const CharacterSearchFilters: CharacterSearchFilters = {
  ACCOUNT_NAME: 'act_name',
  CHARACTER_NAME: 'cha_name',
  CHARACTER_ID: 'cha_id',
};

export const PlayerRankingFilters: PlayerRankingFilters = {
  GOLD: 'gd',
  LEVEL: 'degree'
};


export const DownloadSections: string[] = [ 'Client', 'Patch', 'Other' ];
export const IncludeAdminInRanking = true;
export const MaximumRankingItems = 30;
export const shouldNewAccountsBeGMs = true;
