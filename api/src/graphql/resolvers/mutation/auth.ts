import Joi from '@hapi/joi';
import { Op } from 'sequelize';

import { resolve } from '../../utils/resolver';

import User from '../../../database/models/AccountServer/User';
import Account from '../../../database/models/GameDB/Account';
import { shouldNewAccountsBeGMs } from '../../../config';
import { hashPassword } from '../../../helpers/user';
import { loginUser as logUserIn } from '../../../helpers/authHelpers';

/**
 * Creates a new user
 *
 * @param {string} username -> The username of the new user
 * @param {string} email -> The email of the new user
 * @param {string} password -> The password of the new user
 */
export const createUser = resolve( {
  validationSchema: {
    input: Joi.object( {
      username: Joi.string().min( 4 ).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min( 5 ).required(),
    } )
  },

  async action( { args, context } ) {
    const {
      input: {
        username,
        email,
        password
      }
    } = args;

    await User.findOne( {
      where: {
        [ Op.or ]: [
          {
            name: username
          },
          {
            email,
          }
        ]
      },
      rejectOnEmpty: false,
      rejectOnFound: true
    } );

    const user = await User.create( {
      name: username,
      email,
      password: hashPassword( password ),
    } );

    await Account.create( {
      act_id: user.id,
      act_name: user.name,
      gm: shouldNewAccountsBeGMs ? 99 : 0,
    } );

    const scope = await user.getAccessLevel();

    logUserIn( context, {
      id: user.id,
      scope
    } );

    return {
      data: user,
    };
  }
} );

/**
 * Logs the user in by creating a JWT and sending it as a cookie to the browser
 *
 * @param {string} username -> Username of the user to log in
 * @param {string} password -> Password of the user to log in
 */
export const loginUser = resolve( {
  validationSchema: {
    input: Joi.object( {
      username: Joi.string().min( 4 ).required(),
      password: Joi.string().min( 5 ).required(),
    } )
  },
  async action( { args, context } ) {
    const {
      input: {
        username,
        password
      }
    } = args;

    const hashedPassword = hashPassword( password );
    const user = await User.findOne( {
      where: {
        name: username,
        password: hashedPassword
      },
    } );


    const scope = await user.getAccessLevel();

    logUserIn( context, {
      id: user.id,
      scope
    } );

    return {
      data: user
    };
  }
} );

/**
 * Logs the user out by removing the auth cookie from their browser
 */
export const logoutUser = resolve( {
  async action( { context } ) {
    context.res.clearCookie( '_sid' );
    return {
      data: {
        id: context.req.user
      }
    };
  }
} );
