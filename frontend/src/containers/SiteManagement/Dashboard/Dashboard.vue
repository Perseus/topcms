<template>
  <section class="dashboard">
    <router-view :authors="authors" @edit="editItem" @delete="deleteItem" @create="createItem"></router-view>
  </section>
</template>


<script src="./Dashboard.js"></script>
<style src="./Dashboard.scss" lang="scss" scoped></style>