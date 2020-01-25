<template>
  <div class="inventory-grid">
    <div class="inventory-grid-item" v-for="index in maximumItems" :key="index">
      <item-tooltip
        v-if="isThereItemAtSlot(index-1)"
        :tooltipContent="getContentForTooltip(index-1)"
      >
        <img
          :src="`${publicPath}img/icons/${getItemIcon( getItemAtSlot( index-1 ) )}.png`"
          v-if="doesItemHaveIcon(getItemAtSlot(index-1))"
        />
      </item-tooltip>
      <div class="item-count-container">{{ getItemCount( getItemAtSlot( index - 1 ) ) }}</div>
    </div>
  </div>
</template>

<script src="./InventoryGrid.js"></script>
<style src="./InventoryGrid.scss" lang="scss" scoped></style>