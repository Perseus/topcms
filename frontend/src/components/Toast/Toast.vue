<template>
  <div :class="['toast', options.type]" @click="dismissToast">{{ options.text }}</div>
</template>


<script src="./Toast.js"></script>
<style src="./Toast.scss" lang="scss" scoped></style>