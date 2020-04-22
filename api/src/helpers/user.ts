import crypto from 'crypto';

export const hashPassword = ( password: string ): string => {
  const hashedPassword = crypto.createHash( 'md5' ).update( password ).digest( 'hex' ).toUpperCase();
  return hashedPassword;
};
