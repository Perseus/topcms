import forEach from 'lodash/forEach';

export const ItemAttributeMap = {
  ID: 0,
  NAME: 1,
  ICON: 2,
  ITEM_TYPE: 10,
  LEVEL_REQUIREMENT: 24,
  ENERGY: 75,
  DURABILITY: 75,
  DESCRIPTION: 93,
};

export const DBItemAttributeMap = {

  // General information
  SLOT: 0,
  ID: 1,
  AMOUNT: 2,
  CURRENT_DURABILITY: 3,
  MAX_DURABILITY: 4,
  CURRENT_ENERGY: 5,
  MAX_ENERGY: 6,

  // Pet information
  CURRENT_PET_STAMINA: 3,
  MAX_PET_STAMINA: 4,
  CURRENT_PET_GROWTH: 5,
  MAX_PET_GROWTH: 6,
  STRENGTH: 12,
  AGILITY: 14,
  SPIRIT: 16,
  CONSTITUTION: 18,
  ACCURACY: 20,

  // Equipment information
  GEM_STRING: 8,

  // Weapons
  MIN_ATTACK: 12,
  MAX_ATTACK: 14,

  // Armor
  ARMOR_DEFENSE: 12,
  PHYS_RESIST: 14,

  // Shoes
  DODGE: 12,
  SHOES_DEFENSE: 14,

  // Gloves
  HIT_RATE: 12,
  GLOVES_DEFENSE: 14,

};

export function getAttributesFromItem( item, attributes = [], type = 'iteminfo' ) {
  const itemAttributes = {};
  let attributeMap = ItemAttributeMap;
  if ( type === 'db' ) {
    attributeMap = DBItemAttributeMap;
  }

  forEach( attributeMap, ( value, key ) => {
    if ( attributes.includes( value ) ) {
      itemAttributes[ key ] = item[ value ];
    }
  } );

  return itemAttributes;
}
