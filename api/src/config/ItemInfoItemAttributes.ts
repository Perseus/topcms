// eslint-disable-next-line no-tabs
const itemInfoTsvAttributeString = 'ID	Item Name	ICON	Item Model	Lance Texture	Carsise Texture	Phyllis Texture	Ami Texture	Ship Symbol	ship siz number	Type	obtain prefix rate	set ID	Forging Level	Stable value	only ID	Tradeable Or Not	picked	Discard	Confirm to delete	stackable	is it instantiation	SELLING PRICE	Lance=1,Carise=2,Phyliss=3,Ami=4	Character Level	Class	Character Nick	Character Reputation	item can equip location	item switch location	item obtain into location determine	Str modulus bonus	Agi modulus bonus	Dex modulus bonus	Con modulus bonus	Spr modulus bonus	Luk modulus bonus	ASPD Bonus	????????	?????????	?????????	Percent Def Bonus	Percent HP Bonus	Percent SP  Bonus	flee modulus bonus	Hit modulus bonus	crt modulus bonus	mf modulus bonus	hrec modulus bonus	srec modulus bonus	mspd modulus bonus	col modulus bonus	STR (STAT)	AGI (STAT)	ACC (STAT)	CON (STAT)	SPR (STAT)	Lukconstant bonus	????????	????????	Min Attack Power	Max Attack Power	+ Defense	+ Max HP Bonus	+ Max SP Bonus	+ Dodge Rate Bonus	hitconstant bonus	crtconstant bonus	mfconstant bonus	HP Recovery Speed Bonus	SP Recovery Speed Bonus	+ MSPD Bonus	colconstant bonus	Physical Resist	item left hand exert identifier	Item Energy	Durability	Max instantiation hole value	Ship durability recovered	can contain cannon quantity	ship member count	member label	Cargo Capacity	Fuel consumption	Cannonball Path of Flight speed	ship movement speed	usage effect	display effect	item bind effect	item bind effect dummy	Display item effect (item put at object slot 1 to show effect)	item drop model effect	item usage effect	Description (Item level)	Remark';

function normalizeAttributeNames( attributes: Record<string, number> ): void {
  Object.assign( attributes, {
    NAME: attributes[ 'Item Name' ],
    ENERGY: attributes[ 'Item Energy' ],
    DURABILITY: attributes.Durability,
    ITEM_TYPE: attributes.Type,
    DESCRIPTION: attributes[ 'Description (Item level)' ],
    LEVEL_REQUIREMENT: attributes[ 'Character Level' ],
    STRENGTH_BONUS: attributes[ 'STR (STAT)' ],
    CONSTITUTION_BONUS: attributes[ 'CON (STAT)' ],
    ACCURACY_BONUS: attributes[ 'ACC (STAT)' ],
    AGILITY_BONUS: attributes[ 'AGI (STAT)' ],
    SPIRIT_BONUS: attributes[ 'SPR (STAT)' ],
    TRADE_PRICE: attributes[ 'SELLING PRICE' ],
  } );
}

function parseTsvAttributeString( string: string ): Record<string, number> {
  const attributes = string.split( '\t' );
  const attributeMap: Record<string, number> = {};

  for ( let i = 0; i < attributes.length; i++ ) {
    attributeMap[ attributes[ i ] ] = i;
  }

  normalizeAttributeNames( attributeMap );

  return attributeMap;
}
export const ItemInfoAttributeMap = parseTsvAttributeString( itemInfoTsvAttributeString );

export function serializeItemData( itemData: string[] ): string {
  const serializedItem: Record<string, string> = {};

  for ( const [ key, value ] of Object.entries( ItemInfoAttributeMap ) ) {
    serializedItem[ key ] = itemData[ value ] || '';
  }

  return JSON.stringify( serializedItem );
}
