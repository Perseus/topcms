
const { isUnique } = require( '../../validators/validators' );
const { JobTypes, CharacterModelTypes } = require( '../../../config' );
const InventoryParser = require( '../../../utils/InventoryParser' );


const characterModel = ( sequelize, DataTypes ) => {
  const Character = sequelize.define( 'Character', {

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
      get() {
        const retrievedJob = this.getDataValue( 'job' );
        if ( JobTypes[ retrievedJob ] ) {
          return JobTypes[ retrievedJob ];
        }

        return retrievedJob;
      }
    },
    icon: {
      type: DataTypes.INTEGER,
      get() {
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
      async get() {
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

  }, {
    tableName: 'character',
    timestamps: false,
  } );

  Character.associate = function( models ) {
    this.belongsTo( models.Account, {
      targetKey: 'act_id',
      foreignKey: 'act_id',
      as: 'account'
    } );

    this.hasOne( models.Guild, {
      sourceKey: 'guild_id',
      foreignKey: 'guild_id',
      as: 'guild'
    } );

    this.hasMany( models.Resource, {
      sourceKey: 'cha_id',
      foreignKey: 'cha_id',
      as: 'inventories',
    } );
  };

  return Character;
};

module.exports = characterModel;
