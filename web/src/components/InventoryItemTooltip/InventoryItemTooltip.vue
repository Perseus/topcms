<template>
  <div class="inventory-item-tooltip">
    <transition name="fade">
      <div v-html="tooltipContent" class="tooltip-content"></div>
    </transition>
    <div class="inventory-item-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script src="./InventoryItemTooltip.js"></script>
<style src="./InventoryItemTooltip.scss" lang="scss" scoped></style>

<style>
.item-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 180px;
  font-size: 12px;
  text-align: center;
}

.item-name {
  margin-bottom: 5px;
}

.item-description {
  margin-top: 10px;
}

.pet-information {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}

.item-eq-stats-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
}

.item-bonus-stats-section {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
}


</style>