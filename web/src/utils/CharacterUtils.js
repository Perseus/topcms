import forEach from 'lodash/forEach';

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
  const { itemInfo } = item;

  const itemType = itemInfo.ITEM_TYPE;
  const isEquippableGear = EQUIPMENT_IDS.includes( parseInt( itemType ) );
  const isPet = parseInt( itemType ) === PET_ITEM_TYPE;

  let { NAME, DESCRIPTION } = itemInfo;
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

    forEach( petData.stats, ( stat, name ) => {
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

    const gearBonusData = getGearBonusData( itemInfo );
    gearBonusData.forEach( ( dataItem ) => {
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
  const Strength = parseInt( dbAttributes[ DBItemAttributeMap.STRENGTH ] );
  const Accuracy = parseInt( dbAttributes[ DBItemAttributeMap.ACCURACY ] );
  const Constitution = parseInt( dbAttributes[ DBItemAttributeMap.CONSTITUTION ] );
  const Spirit = parseInt( dbAttributes[ DBItemAttributeMap.SPIRIT ] );
  const Agility = parseInt( dbAttributes[ DBItemAttributeMap.AGILITY ] );

  const currentStamina = parseInt( dbAttributes[ DBItemAttributeMap.CURRENT_PET_STAMINA ] ) / 50;
  const maximumStamina = parseInt( dbAttributes[ DBItemAttributeMap.MAX_PET_STAMINA ] ) / 50;
  const currentPetGrowth = parseInt( dbAttributes[ DBItemAttributeMap.CURRENT_PET_GROWTH ] );
  const maximumPetGrowth = parseInt( dbAttributes[ DBItemAttributeMap.MAX_PET_GROWTH ] );

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
  const equipmentType = parseInt( itemInfo.ITEM_TYPE );
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

  equipmentData.push( `<div class="item-level-req"> Level Requirement: ${itemInfo.LEVEL_REQUIREMENT} </div>` );


  return equipmentData;
}

function getGearBonusData( itemInfo ) {
  const {
    STRENGTH_BONUS, CONSTITUTION_BONUS, ACCURACY_BONUS, AGILITY_BONUS, SPIRIT_BONUS
  } = itemInfo;
  const gearBonusData = [];

  gearBonusData.push( `<div class="item-bonus-stats-section">` );

  const strengthBonus = parseInt( STRENGTH_BONUS.split( ',' )[ 0 ] );
  const constitutionBonus = parseInt( CONSTITUTION_BONUS.split( ',' )[ 0 ] );
  const accuracyBonus = parseInt( ACCURACY_BONUS.split( ',' )[ 0 ] );
  const agilityBonus = parseInt( AGILITY_BONUS.split( ',' )[ 0 ] );
  const spiritBonus = parseInt( SPIRIT_BONUS.split( ',' )[ 0 ] );

  if ( strengthBonus ) {
    gearBonusData.push( `<div class="item-bonus-stat"> Strength Bonus: +${strengthBonus}` );
  }

  if ( constitutionBonus ) {
    gearBonusData.push( `<div class="item-bonus-stat"> Constitution Bonus: +${constitutionBonus}` );
  }

  if ( accuracyBonus ) {
    gearBonusData.push( `<div class="item-bonus-stat"> Accuracy Bonus: +${accuracyBonus}` );
  }

  if ( agilityBonus ) {
    gearBonusData.push( `<div class="item-bonus-stat"> Agility Bonus: +${agilityBonus}` );
  }

  if ( spiritBonus ) {
    gearBonusData.push( `<div class="item-bonus-stat"> Spirit Bonus: +${spiritBonus}` );
  }

  return gearBonusData;
}

function parseAndCleanItemAttributes( attributes ) {
  forEach( attributes, ( attribute, key ) => {
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
