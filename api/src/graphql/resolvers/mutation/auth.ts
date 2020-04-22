import jwt from 'jsonwebtoken';
import Joi from '@hapi/joi';

import { resolve } from '../../utils/resolver';

import User from '../../../database/models/AccountServer/User';
import Account from '../../../database/models/GameDB/Account';
import { shouldNewAccountsBeGMs } from '../../../config';
import { hashPassword } from '../../../helpers/user';

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

  async action( { args } ) {
    const {
      input: {
        username,
        email,
        password
      }
    } = args;

    const user = await User.create( {
      name: username,
      email,
      originalPassword: password,
      password: hashPassword( password ),
    } );

    await Account.create( {
      act_id: user.id,
      act_name: user.name,
      gm: shouldNewAccountsBeGMs ? 99 : 0,
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
      }
    } );

    const scope = await user.getAccessLevel();
    const jwtToken = jwt.sign( {
      id: user.id,
      createdAt: Date.now(),
      scope,
    }, process.env.JWT_SECRET, {
      expiresIn: '6h'
    } );

    context.res.cookie( '_sid', jwtToken, { httpOnly: true, sameSite: true } );

    return {
      data: {
        user
      }
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
