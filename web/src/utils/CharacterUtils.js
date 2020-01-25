import _ from 'lodash';

import { CharacterConfig } from '../config/CharacterConfig';
import { ItemAttributeMap, DBItemAttributeMap, getAttributesFromItem } from '../config/ItemAttributeMap';

export function hasValidJobIcon( character ) {
  const icon = character.icon.toLowerCase();
  const job = character.job.toLowerCase();

  if ( !icon || !job ) {
    return false;
  }

  if ( !CharacterConfig.VALID_JOBS[ icon ] ) {
    return false;
  }

  if ( !CharacterConfig.VALID_JOBS[ icon ].includes( job ) ) {
    return false;
  }

  return true;
}

export const EQUIPMENT_IDS = [ 1, 2, 3, 4, 7, 9, 11, 20, 22, 23, 24, 25, 26, 27, 29 ];
export const PET_ITEM_TYPE = 59;

// TODO: Clean this up
export function getInventoryItemDetailHTML( item ) {
  const { itemInfo, dbAttributes } = item;
  const itemType = itemInfo[ ItemAttributeMap.ITEM_TYPE ];
  const isEquippableGear = Boolean( EQUIPMENT_IDS.includes( Number( itemType ) ) );
  const isPet = Number( itemType ) === PET_ITEM_TYPE;

  const attributesToFetch = [
    ItemAttributeMap.NAME,
    ItemAttributeMap.DESCRIPTION,
  ];

  const dbAttributesToFetch = [];


  if ( isEquippableGear ) {
    attributesToFetch.push( [

    ] );
  }


  const itemAttributes = getAttributesFromItem( itemInfo, attributesToFetch );
  const fetchedDBAttributes = getAttributesFromItem( dbAttributes, dbAttributesToFetch, 'db' );
  const parsedAttributes = parseAndCleanItemAttributes( itemAttributes );
  let { NAME, DESCRIPTION } = parsedAttributes;
  let petData = {};
  let htmlStructure = ``;

  if ( isPet ) {
    petData = getPetData( item );
    NAME = `Lv. ${petData.totalLevel} ${NAME}`;
  }
  // ITEM NAME
  htmlStructure = `
    <div class="item-info">
      <div class="item-name"> ${NAME} </div>
  `;

  if ( isPet ) {
    htmlStructure += `
      <div class="pet-information">`;

    _.forEach( petData.stats, ( stat, name ) => {
      if ( stat > 0 ) {
        htmlStructure += `
        <div class="pet-stat"> ${name}: ${stat} </div>`;
      }
    } );

    htmlStructure += `</div>`;

    htmlStructure += `
      <div class="pet-growth-and-stamina">
        <div class="pet-stamina"> Stamina (${petData.currentStamina}/${petData.maximumStamina}) </div>
        <div class="pet-growth"> Growth (${petData.currentPetGrowth}/${petData.maximumPetGrowth}) </div>
      </div>
    `;
  }

  if ( isEquippableGear ) {
    const equipmentData = getEquipmentData( item );
    equipmentData.forEach( ( dataItem ) => {
      htmlStructure += dataItem;
    } );
  }


  // ITEM DESCRIPTION
  htmlStructure += `
    <div class="item-description"> ${DESCRIPTION} </div>
  `;


  htmlStructure += `
    </div>
  `;
  return htmlStructure;
}


function getPetData( pet ) {
  const { dbAttributes } = pet;
  const Strength = Number( dbAttributes[ DBItemAttributeMap.STRENGTH ] );
  const Accuracy = Number( dbAttributes[ DBItemAttributeMap.ACCURACY ] );
  const Constitution = Number( dbAttributes[ DBItemAttributeMap.CONSTITUTION ] );
  const Spirit = Number( dbAttributes[ DBItemAttributeMap.SPIRIT ] );
  const Agility = Number( dbAttributes[ DBItemAttributeMap.AGILITY ] );

  const currentStamina = Number( dbAttributes[ DBItemAttributeMap.CURRENT_PET_STAMINA ] ) / 50;
  const maximumStamina = Number( dbAttributes[ DBItemAttributeMap.MAX_PET_STAMINA ] ) / 50;
  const currentPetGrowth = Number( dbAttributes[ DBItemAttributeMap.CURRENT_PET_GROWTH ] );
  const maximumPetGrowth = Number( dbAttributes[ DBItemAttributeMap.MAX_PET_GROWTH ] );

  const totalLevel = ( Strength + Accuracy + Constitution + Spirit + Agility );
  return {
    totalLevel,
    stats: {
      Strength,
      Accuracy,
      Constitution,
      Spirit,
      Agility
    },
    currentStamina,
    maximumStamina,
    currentPetGrowth,
    maximumPetGrowth,
  };
}


function getEquipmentData( eq, isGear = false ) {
  const { dbAttributes, itemInfo } = eq;
  const equipmentType = Number( itemInfo[ ItemAttributeMap.ITEM_TYPE ] );
  const equipmentData = [];

  equipmentData.push( '<div class="item-eq-stats-section">' );
  // 20,22,23,24 are all non-weapon gear (armor, boots, gloves, hats )
  if ( [ 20, 22, 23, 24 ].includes( equipmentType ) ) {
    if ( equipmentType === 20 || equipmentType === 22 ) {
      equipmentData.push( `<div class="item-eq-stats"> Defense (+${dbAttributes[ DBItemAttributeMap.ARMOR_DEFENSE ]}) </div>` );
    }
  } else {
    equipmentData.push( `<div class="item-eq-stats"> Attack (${dbAttributes[ DBItemAttributeMap.MIN_ATTACK ]}/${dbAttributes[ DBItemAttributeMap.MAX_ATTACK ]})</div>` );
  }

  equipmentData.push( `<div class="item-eq-stats">Durability (${dbAttributes[ DBItemAttributeMap.CURRENT_DURABILITY ] / 50}/${dbAttributes[ DBItemAttributeMap.MAX_DURABILITY ] / 50})</div>` );

  if ( equipmentType === 22 ) {
    equipmentData.push( `<div class="item-eq-stats"> Physical Resist (+${dbAttributes[ DBItemAttributeMap.PHYS_RESIST ]}) </div>` );
  } else if ( equipmentType === 23 ) {
    equipmentData.push( `<div class="item-eq-stats"> Hit Rate (+${dbAttributes[ DBItemAttributeMap.HIT_RATE ]}) </div>` );
  } else if ( equipmentType === 24 ) {
    equipmentData.push( `<div class="item-eq-stats"> Dodge (+${dbAttributes[ DBItemAttributeMap.DODGE ]}) </div>` );
  }

  equipmentData.push( '</div>' );

  equipmentData.push( `<div class="item-level-req"> Level Requirement: ${itemInfo[ ItemAttributeMap.LEVEL_REQUIREMENT ]} </div>` );


  return equipmentData;
}

function parseAndCleanItemAttributes( attributes ) {
  _.forEach( attributes, ( attribute, key ) => {
    switch ( key ) {
      case 'DESCRIPTION':
        if ( attribute === '0' ) {
          attributes[ key ] = '';
        }
        break;
      default:
    }
  } );

  return attributes;
}
