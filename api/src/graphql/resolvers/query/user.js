import User from '../../../database/models/AccountServer/User';

const { AuthenticationError, UserInputError } = require( 'apollo-server' );
const sequelize = require( 'sequelize' );
const { Sequelize } = require( 'sequelize' );


const { AccountServer, GameDB } = require( '../../../database/models/index' );
const { GeneralConfig } = require( '../../../config' );

module.exports.users = async function users( object, args, context, info ) {
  // const fetchedUsers = await AccountServer.User.findAll();
  // return fetchedUsers;
  const fetchedUsers = await User.findAll();
  return fetchedUsers;
};

module.exports.me = async function me( object, args, context, info ) {
  try {
    const userID = context.req.user;
    const user = await AccountServer.User.findOne( {
      where: {
        id: userID
      }
    } );
    return user;
  } catch ( err ) {
    return err;
  }
};

module.exports.logout = async function logout( object, args, context, info ) {
  try {
    context.res.clearCookie( '_sid' );
    return 'LOGOUT_SUCCESS';
  } catch ( err ) {
    return err;
  }
};


module.exports.usersWithFilter = async function usersWithFilter( object, args, context ) {
  try {
    const { filter, searchKey } = args;
    let { offset, limit } = args;

    if ( !offset ) {
      offset = 0;
    }

    if ( !limit ) {
      limit = 10;
    }

    const filterTableMapper = GeneralConfig.ACCOUNT_SEARCH_FILTERS[ filter ];

    // TODO: combine these queries
    if ( searchKey ) {
      const users = await AccountServer.User.findAll( {
        where: {
          [ filterTableMapper ]: {
            [ sequelize.Op.like ]: `%${searchKey}%`,
          }
        },
        offset,
        limit
      } );
      const totalUsersQuery = await AccountServer.User.findAll( {
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
        users,
        total: JSON.parse( JSON.stringify( totalUsersQuery[ 0 ] ) ).totalUsers,
      };
    }
    const users = await AccountServer.User.findAll( {
      offset,
      limit
    } );

    const totalUsersQuery = await AccountServer.User.findAll( {
      attributes:
        [
          [ sequelize.fn( 'COUNT', sequelize.col( 'id' ) ), 'totalUsers' ]
        ]

    } );

    return {
      users,
      total: JSON.parse( JSON.stringify( totalUsersQuery[ 0 ] ) ).totalUsers,
    };
  } catch ( err ) {
    return new UserInputError( err );
  }
};

module.exports.filteredUser = async function filteredUser( object, args ) {
  try {
    const { id } = args;
    const user = AccountServer.User.findOne( {
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

    const filterTableMapper = GeneralConfig.CHARACTER_SEARCH_FILTERS[ filter ];
    let characters = [];


    if ( filterTableMapper === GeneralConfig.CHARACTER_SEARCH_FILTERS.ACCOUNT_NAME ) {
      characters = await GameDB.Character.findAll( {
        include: [ {
          model: GameDB.Account,
          where: {
            act_name: {
              [ sequelize.Op.like ]: `%${searchKey || ''}%`,
            },
          },
          as: 'account'
        }, { model: GameDB.Guild, as: 'guild' } ],
      } );

      const totalCharactersQuery = await GameDB.Character.findAll( {
        attributes:
        [
          [ sequelize.fn( 'COUNT', 'cha_id' ), 'totalCharacters' ]
        ],
        include: [ {
          model: GameDB.Account,
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
      characters = await GameDB.Character.findAll( {
        where: {
          [ filterTableMapper ]: {
            [ sequelize.Op.like ]: `%${searchKey}%`,
          }
        },
        include: [ {
          model: GameDB.Account,
          as: 'account'
        }, { model: GameDB.Guild, as: 'guild' } ],
        offset,
        limit
      } );

      const totalCharactersQuery = await GameDB.Character.findAll( {
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

    characters = await GameDB.Character.findAll( {
      offset,
      limit
    } );

    const totalCharactersQuery = await GameDB.Character.findAll( {
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
    const character = await GameDB.Character.findOne( {
      where: { cha_id: id },
      include: [ { model: GameDB.Resource, as: 'inventories' }, { model: GameDB.Guild, as: 'guild' } ],
    } );


    return character;
  } catch ( err ) {
    return err;
  }
};
