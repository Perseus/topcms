const AccountSearchFilters: Record<string, string> = {
  ACCOUNT_NAME: 'name',
  IP_ADDRESS: 'last_login_ip',
  MAC_ADDRESS: 'last_login_mac',
  ACCOUNT_ID: 'id',
};

const CharacterSearchFilters: Record<string, string> = {
  ACCOUNT_NAME: 'act_name',
  CHARACTER_NAME: 'cha_name',
  CHARACTER_ID: 'cha_id',
};

const DownloadSections: string[] = [ 'Client', 'Patch', 'Other' ];

const AdminLevels: Record<string, string> = {
  ADMIN: 'ADMIN',
  HD: 'SITE',
};

const IncludeAdminInRanking = true;
const MaximumRankingItems = 30;

export const GeneralConfig = {
  AccountSearchFilters,
  CharacterSearchFilters,
  DownloadSections,
  AdminLevels,
  IncludeAdminInRanking,
  MaximumRankingItems
};
