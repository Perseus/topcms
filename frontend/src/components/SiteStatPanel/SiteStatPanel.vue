<template>
  <section class="stat-panel">
    <div class="stat-item" v-for="(stat) in displayStats" :key="stat.text">
      <font-awesome-icon
        :icon="stat.icon"
        class="stat-icon"
        :style="{
          color: stat.color
        }"
      ></font-awesome-icon>
      <div class="stat-info">
        <span class="stat-info-number">{{ stat.number }}</span>
        <span class="stat-info-title">{{ stat.text }}</span>
      </div>
    </div>
  </section>
</template>


<script src="./SiteStatPanel.js"></script>
<style src="./SiteStatPanel.scss" lang="scss" scoped></style>