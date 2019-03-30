<template>
  <section class="infobar">
    <div class="section">
      <h1 class="header">Server Information</h1>
      <ul class="infolist">
        <li class="infoitem">
          <span class="value">100x</span>
          <span class="label">solo exp rate</span>
        </li>
        <li class="infoitem">
          <span class="value">250x</span>
          <span class="label">party exp rate</span>
        </li>
        <li class="infoitem">
          <span class="value">50x</span>
          <span class="label">drop rate</span>
        </li>
        <li class="infoitem">
          <span class="value">1500x</span>
          <span class="label">fairy exp rate</span>
        </li>
      </ul>
    </div>
    <div class="section">
      <h1 class="header">Server Statistics</h1>
      <ul class="infolist">
        <li class="infoitem">
          <span class="value">500</span>
          <span class="label">accounts</span>
        </li>
        <li class="infoitem">
          <span class="value">600</span>
          <span class="label">characters</span>
        </li>
        <li class="infoitem">
          <span class="value">50</span>
          <span class="label">online</span>
        </li>
        <li class="infoitem">
          <span class="value">150</span>
          <span class="label">online record</span>
        </li>
      </ul>
    </div>

    <div class="status online">
      Server is online
    </div>

    <!-- <div class="status offline">
      Server is offline
    </div> -->
  </section>
</template>


<script src="./InfoBar.js"></script>
<style src="./InfoBar.scss" lang="scss" scoped></style>