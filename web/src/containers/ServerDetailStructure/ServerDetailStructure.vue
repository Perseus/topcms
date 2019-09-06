<template>
  <div class="columns">
    <div class="column is-one-fifths">
      <sidebar-navigation-container></sidebar-navigation-container>
      <server-info
        class="server-info-container"
        :isLoading="isRetrievingGameStats"
        :gameStats="gameStats"
      ></server-info>
    </div>
    <div class="column is-three-fifths">
      <slot name="main-content"></slot>
    </div>
    <div class="column is-one-fifths">
      <staff-status-container :staffInfo="GMInfo" :isFetchingStaffInfo="fetchingStaffInfo"></staff-status-container>
      <server-rates-container
        class="server-rates-container"
        :rates="serverRates"
        :isLoading="fetchingServerRates"
      ></server-rates-container>
    </div>
  </div>
</template>

<script src="./ServerDetailStructure.js"></script>
<style src="./ServerDetailStructure.scss" lang="scss" scoped></style>