<template>
  <div class="columns">
    <div class="column">
      <server-info :isLoading="isRetrievingGameStats" :gameStats="gameStats"></server-info>
    </div>
    <div class="column is-four-fifths"></div>
  </div>
</template>


<script src="./Landing.js"></script>
<style src="./Landing.scss" lang="scss" scoped></style>