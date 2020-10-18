<template>
  <div class="columns">
    <div class="column navi-column">
      <div class="registration-link" v-if="!isUserLoggedIn" @click="redirectToRegistration">
        <img class="registration-img" src="/img/assets/Registration_Main.png" />
      </div>
      <sidebar-navigation-container></sidebar-navigation-container>
      <server-info
        class="server-info-container"
        :isLoading="isRetrievingGameStats"
        :gameStats="gameStats"
      ></server-info>
    </div>
    <div class="column main-column">
      <slot name="main-content"></slot>
    </div>
    <div class="column rates-column">
      <sidebar-login-card v-if="!isUserLoggedIn" />
      <sidebar-myaccount-card :userData="userData" @handleRedirect="handleAccountRedirects" v-else />
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