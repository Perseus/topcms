/* eslint-disable @typescript-eslint/camelcase */

import { DataTypes, Association, HasManyGetAssociationsMixin } from 'sequelize';

// const { isUnique } = require( '../../validators/validators' );
import Guild from './Guild';
import Resource from './Resource';

import { GameDB } from '../..';
import BaseModel from '../../utils/model';
import InventoryParser from '../../../utils/InventoryParser';

import { JobTypes, CharacterModelTypes } from '../../../config';

export default class Character extends BaseModel {
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
  public mem_addr!: number;

  public getResource!: HasManyGetAssociationsMixin<Resource>;

  public static associations: {
    guild: Association<Character, Guild>;
    resource: Association<Character, Resource>;
  }

  public readonly inventories?: Resource[];

  isOnline(): boolean {
    const memAddr = this.mem_addr;
    return ( memAddr !== 0 );
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
  mem_addr: DataTypes.INTEGER,
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
    get(): string|number {
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
    async get(): Promise<Record<any, any>> {
      const look = this.getDataValue( 'look' );
      const inventory = new InventoryParser( 0, look );

      return inventory.retrieveItemsFromGear();
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

}, {
  tableName: 'character',
  timestamps: false,
  sequelize: GameDB,
} );

Guild.belongsTo( Character, {
  targetKey: 'cha_id',
  foreignKey: 'leader_id',
  as: 'leader',
} );

Character.hasOne( Guild, {
  sourceKey: 'guild_id',
  foreignKey: 'guild_id',
  as: 'guild',
} );

Character.hasMany( Resource, {
  sourceKey: 'cha_id',
  foreignKey: 'cha_id',
  as: 'inventories'
} );

Resource.belongsTo( Character, {
  targetKey: 'cha_id',
  foreignKey: 'cha_id',
  as: 'character'
} );
