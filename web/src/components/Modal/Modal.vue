<template>

  <div class="modal" @click="closeModal">
    <slot name="body"></slot>
  </div>

</template>


<script src="./Modal.js"></script>
<style src="./Modal.scss" lang="scss"></style>