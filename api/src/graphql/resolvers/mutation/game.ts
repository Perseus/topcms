import path from 'path';
import { promises } from 'fs';
import Joi from '@hapi/joi';

import { resolve } from '../../utils/resolver';

import User from '../../../database/models/AccountServer/User';

/**
 * Updates the server rates stored in the config
 *
 * @param {number} solo -> The solo EXP rate
 * @param {number} party -> The party EXP rate
 * @param {number} drop -> The drop rate
 * @param {number} ship -> The ship EXP rate
 * @param {number} fairy -> The fairy EXP rate
 */
export const updateServerRates = resolve( {
  validationSchema: {
    rates: Joi.object( {
      solo: Joi.number().optional(),
      party: Joi.number().optional(),
      drop: Joi.number().optional(),
      ship: Joi.number().optional(),
      fairy: Joi.number().optional(),
    } )
  },
  async action( { args } ) {
    const {
      rates
    } = args;

    const configFile = await promises.readFile( path.join( __dirname, '..', '..', '..', 'config', 'interactableConfig.json' ), 'utf-8' );
    const interactableConfig = JSON.parse( configFile );

    Object.keys( rates ).forEach( ( key ) => {
      if ( interactableConfig.rates[ key ] ) {
        interactableConfig.rates[ key ] = rates[ key ];
      }
    } );

    await promises.writeFile( path.join( __dirname, '..', '..', '..', 'config', 'interactableConfig.json' ), JSON.stringify( interactableConfig, null, 2 ) );
    return {
      data: interactableConfig.rates,
    };
  }
} );

/**
 * REQUIRES_ADMIN
 *
 * Toggles the ban status of a user
 *
 * @param {number} id -> ID of the user to toggle ban for
 * @param {number} ban -> The new ban status (0 -> unbanned, 1 -> banned)
 */
export const toggleUserBan = resolve( {
  validationSchema: {
    id: Joi.number().required(),
    newBanStatus: Joi.number().valid( 0, 1 ).required()
  },
  async action( { args } ) {
    const { id, newBanStatus } = args;
    const user = await User.findOne( {
      where: {
        id
      }
    } );

    user.set( 'ban', newBanStatus );
    await user.save();

    return {
      data: user
    };
  }
} );
