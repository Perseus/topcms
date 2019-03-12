<template>

  <button class="tButton" :style="{
    height: height,
    width: width,
    'background-color': backgroundColor
    }" type="submit">
    <slot v-if="!loaderCondition" name="button-text"></slot>
    <div class="loading-circle" v-else></div>
  </button>

</template>


<script src="./Button.js"></script>
<style src="./Button.scss" lang="scss" scoped></style>