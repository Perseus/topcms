export enum AccessLevels {
  ADMIN,
  SITE,
  USER
}

export const getAccessLevelFromString = ( string: string ): AccessLevels => {
  switch ( string ) {
    case 'ADMIN':
      return AccessLevels.ADMIN;
    case 'SITE':
      return AccessLevels.SITE;
    case 'USER':
      return AccessLevels.USER;

    default:
      return null;
  }
};
