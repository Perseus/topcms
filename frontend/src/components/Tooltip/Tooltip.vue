<template>

  <div class="tooltip" :class="type" :style="{
    top: position.top,
    left: position.left,
    right: position.right,
    bottom: position.bottom
    }">
    <span class="tooltip-content">
      <font-awesome-icon icon="exclamation-circle" v-if="type === 'error'"></font-awesome-icon>
      <span class="tooltip-text">
        <slot name="tooltip-text"></slot>
      </span>
    </span>
    <div :class="hook+'-hook'"></div>
  </div>

</template>


<script src="./Tooltip.js"></script>
<style src="./Tooltip.scss" lang="scss" scoped></style>