<template>

  <div class="infoPanel" :class="'infoPanel--' + hue">

    <div class="infoPanel__value">
      <slot name="value"></slot>
    </div>
    <div class="infoPanel__type">
      <slot name="type"></slot>
    </div>

  </div>

</template>


<script src="./InfoPanel.js"></script>
<style src="./InfoPanel.scss" lang="scss"></style>