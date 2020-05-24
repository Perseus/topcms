import path from 'path';
import { promises } from 'fs';
import Joi from '@hapi/joi';
import _ from 'lodash';

import { resolve } from '../../utils/resolver';

import User from '../../../database/models/AccountServer/User';
import StorageBox from '../../../database/models/AccountServer/StorageBox';
import Character from '../../../database/models/GameDB/Character';
import TError from '../../../utils/TError';
import InventoryParser, { InventoryType } from '../../../utils/InventoryParser';
import Resource from '../../../database/models/GameDB/Resource';

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


export const transferItemToGame = resolve( {
  validationSchema: {
    storageId: Joi.number().required(),
    quantity: Joi.number().required(),
    characterId: Joi.number().required(),
  },
  async action( { args, context } ) {
    const { storageId, quantity, characterId } = args;
    const userId = context.req.user.id;

    const storageBox = await StorageBox.findOne( {
      where: {
        act_id: userId
      }
    } );

    const character = await Character.findOne( {
      where: {
        cha_id: characterId,
        act_id: userId
      },
      include: [
        {
          model: Resource,
          as: 'inventories'
        }
      ]
    } );

    // sequelize doesnt support async getters, awaiting like this works
    const items = await storageBox.parsedItems;

    if ( items.length === 0 ) {
      throw new TError( {
        code: 'storageBox.IS_EMPTY',
        message: 'There are no items in the storage box'
      } );
    }

    const itemIndex = _.findIndex( items, value => ( parseInt( value.id ) === storageId && parseInt( value.quantity ) === quantity ) );

    if ( itemIndex === -1 ) {
      throw new TError( {
        code: 'storageBox.ITEM_NOT_FOUND',
        message: 'The item was not found in the storage box'
      } );
    }

    if ( character.isOnline() ) {
      throw new TError( {
        code: 'character.IS_ONLINE',
        message: 'The character is online and cannot be assigned an item.'
      } );
    }

    const characterResources = character.inventories;
    const tempBag = characterResources.filter( resource => resource.type_id === InventoryType.TEMP_BAG )[ 0 ];

    const newStorageBoxItemsList = items.filter( ( val, index ) => index !== itemIndex );

    const parser = new InventoryParser( InventoryType.TEMP_BAG, tempBag.rawContent );

    if ( parser.isInventoryFull() ) {
      throw new TError( {
        code: 'character.TEMP_BAG_FULL',
        message: 'Character\'s temporary bag is full.'
      } );
    }

    const itemsToAdd = [ {
      itemId: parseInt( items[ itemIndex ].itemId ),
      quantity,
    } ];

    const finalInventory = await parser.addItemsToInventory( itemsToAdd );

    tempBag.content = finalInventory;
    await tempBag.save();

    const finalStorageBoxItemsList: string[] = [];

    _.forEach( newStorageBoxItemsList, ( value ) => {
      finalStorageBoxItemsList.push( `${value.itemId},${value.quantity}` );
    } );

    const finalStorageBoxString = finalStorageBoxItemsList.join( ';' );
    storageBox.items = finalStorageBoxString;
    await storageBox.save();

    return {
      data: storageBox
    };
  }
} );
