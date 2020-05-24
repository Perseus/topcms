import sequelize from 'sequelize';

import Joi from '../../utils/validator';
import { resolve } from '../../utils/resolver';
import User from '../../../database/models/AccountServer/User';
import Character from '../../../database/models/GameDB/Character';
import Resource from '../../../database/models/GameDB/Resource';
import Guild from '../../../database/models/GameDB/Guild';
import Account from '../../../database/models/GameDB/Account';
import StorageBox from '../../../database/models/AccountServer/StorageBox';

import { AccountSearchFilters, CharacterSearchFilters } from '../../../config';
import TError from '../../../utils/TError';

/**
 * REQUIRES_ADMIN
 *
 * Returns an array of all users in the `account_login` table
 */
export const users = resolve( {
  async action() {
    const fetchedUsers = await User.findAll();
    return {
      data: fetchedUsers
    };
  }
} );

/**
 * Returns the data of the currently logged in user
 */
export const me = resolve( {
  async action( { context } ) {
    const { id } = context.req.user;
    const user = await User.findOne( {
      where: {
        id
      },
    } );

    return {
      data: user
    };
  }
} );

/**
 * Logs the current user out by removing the session cookie
 */
export const logout = resolve( {
  async action( { context } ) {
    context.res.clearCookie( '_sid' );
    return {
      data: 'LOGOUT_SUCCESS',
    };
  }
} );

/**
 * REQUIRES_ADMIN
 *
 * Fetches a list of accounts depending on a few arguments
 * @param {string} filter - The field to use to look for the user (IP, account name, account ID, MAC)
 * @param {string} searchKey - The search key to look for
 * @param {string} offset - Pagination offset
 * @param {string} limit - Number of users to fetch
 */
export const usersWithFilter = resolve( {
  validationSchema: {
    filter: Joi.string().valid( ...Object.keys( AccountSearchFilters ) ),
    searchKey: Joi.string().allow( '' ),
    offset: Joi.number().default( 0 ),
    limit: Joi.number().default( 10 ),
  },
  async action( { args } ) {
    const {
      filter, searchKey, offset, limit
    } = args;

    const filterTableMapper = AccountSearchFilters[ filter ];

    if ( !filterTableMapper ) {
      throw new TError( {
        code: 'input.INVALID_PARAMS',
        message: 'Invalid search filter provided',
        params: {
          filter
        }
      } );
    }

    const foundUsers = await User.findAndCountAll( {
      where: {
        [ filterTableMapper ]: {
          [ sequelize.Op.like ]: `%${searchKey}%`
        }
      },
      offset,
      limit
    } );

    const { count, rows } = foundUsers;
    return {
      data: {
        users: rows,
        total: count
      }
    };
  }
} );

/**
 * REQUIRES_ADMIN
 *
 * Fetches one user's data
 * @param {string} id - The account id of the user to fetch
 */
export const filteredUser = resolve( {
  validationSchema: {
    id: Joi.number().exist(),
  },
  async action( { args } ) {
    const { id } = args;
    const user = await User.findOne( {
      where: { id },
      rejectOnEmpty: true,
    } );

    return {
      data: user,
    };
  }
} );

/**
 * REQUIRES_ADMIN
 *
 * Fetches a list of characters depending on a few arguments
 * @param {string} filter - The field to use to look for the character (account name, character name, character id)
 * @param {string} searchKey - The search key to look for
 * @param {string} offset - Pagination offset
 * @param {string} limit - Number of characters to fetch
 */
export const charactersWithFilter = resolve( {
  validationSchema: {
    filter: Joi.string().valid( ...Object.keys( CharacterSearchFilters ) ),
    searchKey: Joi.string().allow( '' ),
    offset: Joi.number().default( 0 ),
    limit: Joi.number().default( 10 ),
  },
  async action( { args } ) {
    const {
      filter, searchKey, offset, limit
    } = args;

    const filterTableMapper = CharacterSearchFilters[ filter ];

    if ( !filterTableMapper ) {
      throw new TError( {
        code: 'input.INVALID_PARAMS',
        message: 'Invalid search filter provided',
        params: {
          filter
        }
      } );
    }

    let results: { rows: Character[]; count: number };

    if ( filterTableMapper === CharacterSearchFilters.ACCOUNT_NAME ) {
      results = await Character.findAndCountAll( {
        include: [
          {
            model: Account,
            where: {
              act_name: {
                [ sequelize.Op.like ]: `%${searchKey}%`
              }
            },
            as: 'account'
          },
          { model: Guild, as: 'guild' }
        ],
        offset,
        limit
      } );
    } else {
      results = await Character.findAndCountAll( {
        where: {
          [ filterTableMapper ]: {
            [ sequelize.Op.like ]: `%${searchKey}%`,
          }
        },
        include: [ {
          model: Account,
          as: 'account'
        }, { model: Guild, as: 'guild' } ],
        offset,
        limit
      } );
    }


    return {
      data: {
        characters: results.rows,
        total: results.count,
      }
    };
  }
} );

/**
 * REQUIRES_ADMIN
 *
 * Fetches one character's data
 * @param {string} id - The account id of the character to fetch
 */
export const filteredCharacter = resolve( {
  validationSchema: {
    id: Joi.number().exist(),
  },
  async action( { args } ) {
    const { id } = args;

    const character = await Character.findOne( {

      where: {
        cha_id: id
      },

      include: [ {
        model: Resource,
        as: 'inventories'
      }, {
        model: Guild,
        as: 'guild'
      } ],

      rejectOnEmpty: true,
    } );

    return {
      data: character,
    };
  }
} );


/**
 * REQUIRES_USER
 *
 * Fetches a user's storage box content
 */
export const storageBox = resolve( {
  async action( { context } ) {
    const userId = context.req.user.id;

    const box = await StorageBox.findOne( {
      where: {
        id: userId
      }
    } );

    return {
      data: box
    };
  }
} );
