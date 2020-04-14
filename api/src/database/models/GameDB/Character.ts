/* eslint-disable @typescript-eslint/camelcase */

import { Model, DataTypes, Association } from 'sequelize/types';

import { GameDB } from '../..';
import Account from './Account';
// const { isUnique } = require( '../../validators/validators' );
const { JobTypes, CharacterModelTypes } = require( '../../../config' );
const InventoryParser = require( '../../../utils/InventoryParser' );

export default class Character extends Model {
  public cha_id!: number;
  public cha_name!: string;
  public act_id!: number;
  public guild_id!: number;
  public job!: string;
  public icon!: number;
  public degree!: number;
  public exp!: number;
  public hp!: number;
  public sp!: number;
  public gd!: number;
  public map!: string;
  public map_x!: string;
  public map_y!: string;
  public look!: string;
  public kb_capacity!: number;
  public kitbag!: number;
  public skillbag!: string;
  public birth!: string;
  public credit!: number;
  public bank!: number;
  public estop!: string;
  public delflag!: number;

  public static associations: {
    account: Association<Character, Account>;
    // guild: Association<Character, Guild>;
    // resource: Association<Character, Resource>;
  }
}


Character.init( {
  cha_id: {
    type: DataTypes.DECIMAL,
    primaryKey: true,
    autoIncrement: true,
  },
  cha_name: {
    type: DataTypes.STRING,
  },
  act_id: DataTypes.DECIMAL,
  guild_id: DataTypes.DECIMAL,
  job: {
    type: DataTypes.STRING,
    get(): string {
      const retrievedJob = this.getDataValue( 'job' );
      if ( JobTypes[ retrievedJob ] ) {
        return JobTypes[ retrievedJob ];
      }

      return retrievedJob;
    }
  },
  icon: {
    type: DataTypes.INTEGER,
    get(): number {
      const retrievedIcon = this.getDataValue( 'icon' );
      if ( CharacterModelTypes[ retrievedIcon ] ) {
        return CharacterModelTypes[ retrievedIcon ];
      }

      return retrievedIcon;
    },
  },
  degree: DataTypes.DECIMAL,
  exp: DataTypes.DECIMAL,
  hp: DataTypes.DECIMAL,
  sp: DataTypes.DECIMAL,
  gd: DataTypes.DECIMAL,
  map: DataTypes.STRING,
  map_x: DataTypes.STRING,
  map_y: DataTypes.STRING,
  look: {
    type: DataTypes.TEXT,
    async get(): Promise<string> {
      const look = this.getDataValue( 'look' );
      const inventory = new InventoryParser( 0, look );

      return JSON.stringify( await inventory.retrieveItemsFromGear() );
    },
  },
  kb_capacity: DataTypes.DECIMAL,
  kitbag: DataTypes.DECIMAL,
  skillbag: DataTypes.STRING,
  birth: DataTypes.STRING,
  credit: DataTypes.DECIMAL,
  bank: DataTypes.DECIMAL,
  estop: DataTypes.STRING,
  delflag: DataTypes.INTEGER,

},
{
  tableName: 'character',
  timestamps: false,
  sequelize: GameDB,
} );

Character.belongsTo( Account, {
  targetKey: 'act_id',
  foreignKey: 'act_id',
  as: 'account'
} );

//     this.hasOne( models.Guild, {
//       sourceKey: 'guild_id',
//       foreignKey: 'guild_id',
//       as: 'guild'
//     } );

//     this.hasMany( models.Resource, {
//       sourceKey: 'cha_id',
//       foreignKey: 'cha_id',
//       as: 'inventories',
//     } );
//   };
