<template>
  <section class="dashboard">
    <router-view :authors="authors" @edit="editItem" @delete="deleteItem" @create="createItem"></router-view>
  </section>
</template>


<script src="./ContentManagement.js"></script>
<style src="./ContentManagement.scss" lang="scss" scoped></style>