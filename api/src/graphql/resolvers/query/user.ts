import { UserInputError } from 'apollo-server';
import sequelize from 'sequelize';

import { resolve } from '../../utils/resolver';
import User from '../../../database/models/AccountServer/User';
import Character from '../../../database/models/GameDB/Character';
import Resource from '../../../database/models/GameDB/Resource';
import Guild from '../../../database/models/GameDB/Guild';
import Account from '../../../database/models/GameDB/Account';

import { GeneralConfig } from '../../../config';
import TError from '../../../utils/TError';

export const users = resolve( {
  async exec() {
    const fetchedUsers = await User.findAll();
    return {
      data: fetchedUsers
    };
  }
} );

export const me = resolve( {
  async exec( { context } ) {
    const { id } = context.req.user;

    try {
      const user = await User.findOne( {
        where: {
          id
        }
      } );
      return {
        data: user
      };
    } catch ( err ) {
      throw new TError( {
        code: 'user.NOT_FOUND',
        message: 'User was not found',
        params: {
          id,
        }
      } );
    }
  }
} );


export async function logout( object, args, context, info ): Promise<string> {
  try {
    context.res.clearCookie( '_sid' );
    return 'LOGOUT_SUCCESS';
  } catch ( err ) {
    return err;
  }
}

export async function usersWithFilter( object, args: Record<string, string|number> ): Promise<Record<User[], number>|UserInputError> {
  try {
    const { filter, searchKey } = args;
    let { offset, limit } = args;

    if ( !offset ) {
      offset = 0;
    }

    if ( !limit ) {
      limit = 10;
    }

    const filterTableMapper = GeneralConfig.AccountSearchFilters[ filter ];

    // TODO: combine these queries
    if ( searchKey ) {
      const foundUsers = await User.findAll( {
        where: {
          [ filterTableMapper ]: {
            [ sequelize.Op.like ]: `%${searchKey}%`,
          }
        },
        offset,
        limit
      } );
      const totalUsersQuery = await User.findAll( {
        attributes:
        [
          [ sequelize.fn( 'COUNT', sequelize.col( 'id' ) ), 'totalUsers' ]
        ],
        where: {
          [ filterTableMapper ]: {
            [ sequelize.Op.like ]: `%${searchKey}%`,
          }
        }
      } );

      return {
        users: foundUsers,
        total: JSON.parse( JSON.stringify( totalUsersQuery[ 0 ] ) ).totalUsers,
      };
    }
    const foundUsers = await User.findAll( {
      offset,
      limit
    } );

    const totalUsersQuery = await User.findAll( {
      attributes:
        [
          [ sequelize.fn( 'COUNT', sequelize.col( 'id' ) ), 'totalUsers' ]
        ]

    } );

    return {
      users: foundUsers,
      total: JSON.parse( JSON.stringify( totalUsersQuery[ 0 ] ) ).totalUsers,
    };
  } catch ( err ) {
    return new UserInputError( err );
  }
}

module.exports.filteredUser = async function filteredUser( object, args ) {
  try {
    const { id } = args;
    const user = User.findOne( {
      where: { id }
    } );
    return user;
  } catch ( err ) {
    return err;
  }
};


module.exports.charactersWithFilter = async function charactersWithFilter( object, args, context ) {
  try {
    const { filter, searchKey } = args;
    let { offset, limit } = args;

    if ( !offset ) {
      offset = 0;
    }

    if ( !limit ) {
      limit = 10;
    }

    const filterTableMapper = GeneralConfig.CharacterSearchFilters[ filter ];
    let characters = [];


    if ( filterTableMapper === GeneralConfig.CharacterSearchFilters.ACCOUNT_NAME ) {
      characters = await Character.findAll( {
        include: [ {
          model: Account,
          where: {
            act_name: {
              [ sequelize.Op.like ]: `%${searchKey || ''}%`,
            },
          },
          as: 'account'
        }, { model: Guild, as: 'guild' } ],
      } );

      const totalCharactersQuery = await Character.findAll( {
        attributes:
        [
          [ sequelize.fn( 'COUNT', 'cha_id' ), 'totalCharacters' ]
        ],
        include: [ {
          model: Account,
          where: {
            act_name: {
              [ sequelize.Op.like ]: `%${searchKey || ''}%`,
            },
          },
          attributes: [ 'act_id', 'act_name' ],
          as: 'account'
        } ],
        group: [ 'cha_id', 'account.act_id', 'account.act_name' ],
      } );

      return {
        characters,
        total: totalCharactersQuery.length
      };
    }
    // TODO: combine these queries
    if ( searchKey ) {
      characters = await Character.findAll( {
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

      const totalCharactersQuery = await Character.findAll( {
        attributes:
        [
          [ sequelize.fn( 'COUNT', sequelize.col( 'cha_id' ) ), 'totalCharacters' ]
        ],
        where: {
          [ filterTableMapper ]: {
            [ sequelize.Op.like ]: `%${searchKey}%`,
          }
        },
      } );
      return {
        characters,
        total: JSON.parse( JSON.stringify( totalCharactersQuery[ 0 ] ) ).totalCharacters,
      };
    }

    characters = await Character.findAll( {
      offset,
      limit
    } );

    const totalCharactersQuery = await Character.findAll( {
      attributes:
      [
        [ sequelize.fn( 'COUNT', sequelize.col( 'cha_id' ) ), 'totalCharacters' ]
      ],
    } );

    return {
      characters,
      total: JSON.parse( JSON.stringify( totalCharactersQuery[ 0 ] ) ).totalCharacters,
    };
  } catch ( err ) {
    return new UserInputError( err );
  }
};

module.exports.filteredCharacter = async function filteredCharacter( object, args ) {
  try {
    const { id } = args;
    const character = await Character.findOne( {
      where: { cha_id: id },
      include: [ { model: Resource, as: 'inventories' }, { model: Guild, as: 'guild' } ],
    } );


    return character;
  } catch ( err ) {
    return err;
  }
};
