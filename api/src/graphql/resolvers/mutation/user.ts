import crypto from 'crypto';
import Joi from '@hapi/joi';
import { resolve } from '../../utils/resolver';
import TError from '../../../utils/TError';
import User from '../../../database/models/AccountServer/User';
import Account from '../../../database/models/GameDB/Account';

/**
 * Updates a user's details
 *
 * @param {string} email -> The new email
 * @param {string} old_password -> The old passsword
 * @param {string} new_pasword -> The new password
 */
export const updateUser = resolve( {
  validationSchema: {
    userInfo: Joi.object( {
      email: Joi.string().min( 5 ).email().optional(),
      old_password: Joi.string().min( 5 ).when( 'new_password', { is: Joi.string().min( 5 ), then: Joi.required(), otherwise: Joi.optional() } ),
      new_password: Joi.string().min( 5 ).optional(),
    } )
  },
  async action( { args, context } ) {
    const { userInfo: { email, old_password, new_password } } = args;
    const { req: { user } } = context;

    if ( !user ) {
      throw new TError( {
        code: 'user.NO_AUTH',
        message: 'User is not authenticated',
      } );
    }

    const found = await User.findOne( {
      where: {
        id: user.id
      },
      rejectOnEmpty: true
    } );

    if ( old_password && new_password ) {
      const doesOldPasswordMatch = found.matchPassword( old_password );

      if ( !doesOldPasswordMatch ) {
        throw new TError( {
          code: 'user.PASSWORD_MISMATCH',
          message: 'Given password does not match',
        } );
      }

      found.set( {
        originalPassword: new_password,
        password: crypto.createHash( 'md5' ).update( new_password ).digest( 'hex' ).toUpperCase()
      } );
    }

    if ( email ) {
      found.set( {
        email
      } );
    }

    const updatedUser = await found.save();

    return {
      data: updatedUser
    };
  }
} );

/**
 * REQUIRES_ADMIN
 *
 * API for a GM account to update a user's details
 *
 * @param {number} id -> The ID of the user to update
 * @param {string} email -> The new email of the user
 * @param {number} gm -> The new GM level of the user
 * @param {string} password -> The new password of the user
 */
export const updateUserFromAdmin = resolve( {
  validationSchema: {
    id: Joi.number().required(),
    email: Joi.string().email().optional(),
    gm: Joi.number().optional(),
    password: Joi.string().min( 5 ).optional()
  },
  async action( { args } ) {
    const {
      id, email, gm, password
    } = args;

    const user = await User.findOne( {
      where: {
        id
      }
    } );

    if ( email || password ) {
      user.set( {
        email,
      } );

      if ( password ) {
        user.set( {
          originalPassword: password,
          password: crypto.createHash( 'md5' ).update( password ).digest( 'hex' ).toUpperCase()
        } );
      }

      await user.save();
    }

    if ( gm ) {
      const account = await Account.findOne( {
        where: {
          act_id: id
        }
      } );

      account.set( {
        gm
      } );

      await account.save();
    }

    return {
      data: user
    };
  }
} );

/**
 * REQUIRES_ADMIN
 *
 * Allows an admin to reset a user's in-game security code
 *
 * @param {number} id -> ID of the user to reset the security code for
 */
export const resetUserSecurityCode = resolve( {
  validationSchema: {
    id: Joi.number().required()
  },

  async action( { args } ) {
    const { id } = args;

    const account = await Account.findOne( {
      where: {
        act_id: id
      }
    } );

    await account.resetSecurityCode();

    return {
      data: account
    };
  }
} );
