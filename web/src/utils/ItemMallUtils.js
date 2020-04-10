const getFilteredMallItems = ( items, categoryId ) => items.filter( item => item.categoryId === categoryId );
const mallTypeMap = {
  AWARD_CENTER: 'Award Center',
  ITEM_MALL: 'Item Mall',
};

export {
  getFilteredMallItems,
  mallTypeMap
};
