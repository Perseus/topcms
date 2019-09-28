<template>
  <div class="inventory-grid">
    <div class="inventory-grid-item" v-for="index in maximumItems" :key="index">
      <b-tooltip
        :label="getTooltipLabel( getItemAtSlot(index) )"
        animated
        v-if="isThereItemAtSlot(index)"
      >
        <img :src="getItemIcon(  getItemAtSlot(index) )" />
      </b-tooltip>
    </div>
  </div>
</template>

<script src="./InventoryGrid.js"></script>
<style src="./InventoryGrid.scss" lang="scss" scoped></style>