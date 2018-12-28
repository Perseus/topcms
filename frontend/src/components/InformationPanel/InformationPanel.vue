<template>
  <div class="information-panel">

    <div class="information-panel__heading">
      <slot name="heading"></slot>
    </div>

    <div class="information-panel__body">
      <slot name="body"></slot>
    </div>

  </div>
</template>


<script src="./InformationPanel.js"></script>
<style src="./InformationPanel.scss" lang="scss"></style>