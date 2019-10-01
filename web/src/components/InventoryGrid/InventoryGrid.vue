<template>
  <div class="inventory-grid">
    <div class="inventory-grid-item" v-for="index in maximumItems" :key="index">
      <b-tooltip
        :label="getTooltipLabel( getItemAtSlot( index-1 ) )"
        animated
        v-if="isThereItemAtSlot( index-1 )"
      >
        <img :src="getItemIcon(  getItemAtSlot( index-1 ) )" />
      </b-tooltip>
    </div>
  </div>
</template>

<script src="./InventoryGrid.js"></script>
<style src="./InventoryGrid.scss" lang="scss" scoped></style>