<template>
  <div class="character-details-wrapper">
    <div class="character-details">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Character Information</p>
        </header>

        <div class="card-content">
          <div class="character-information">
            <div class="detail-row">
              <div class="detail-title is-size-6">Character Name:</div>
              <div
                class="detail-value is-size-6 has-text-weight-bold"
              >{{ characterDetails.cha_name }}</div>
            </div>

            <div class="detail-row">
              <div class="detail-title is-size-6">Guild:</div>
              <div
                class="detail-value is-size-6 has-text-weight-bold"
              >{{ characterDetails.guild.guild_name }}</div>
            </div>

            <div class="detail-row">
              <div class="detail-title is-size-6">Gold:</div>
              <div class="detail-value is-size-6 has-text-weight-bold">{{ characterDetails.gd }}</div>
            </div>

            <div class="detail-row">
              <div class="detail-title is-size-6">Level:</div>
              <div class="detail-value is-size-6 has-text-weight-bold">{{ characterDetails.degree }}</div>
            </div>

            <div class="detail-row">
              <div class="detail-title is-size-6">Reputation:</div>
              <div class="detail-value is-size-6 has-text-weight-bold">{{ characterDetails.credit }}</div>
            </div>

            <div class="detail-row">
              <div class="detail-title is-size-6">Current Location:</div>
              <div
                class="detail-value is-size-6 has-text-weight-bold"
              >{{ currentCharacterLocation }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Character Gear</p>
        </header>
        <div class="card-content inventory-information">
          <div class="character-gear-container">
            <div :class="[ 'character-gear', key ]" v-for="(gear, key) in currentGear" :key="key">
              <inventory-item-tooltip v-if="gear" :tooltipContent="getContentForTooltip(gear)">
                <img
                  class="gear-icon"
                  :src="`${publicPath}img/icons/${getItemIcon(  gear )}.png`"
                  v-if="doesItemHaveIcon(gear)"
                />
              </inventory-item-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-tabs type="is-toggle" expanded :animated="false">
      <b-tab-item label="Inventory">
        <inventory-grid :inventory="characterDetails.inventories[0]"></inventory-grid>
      </b-tab-item>

      <b-tab-item label="Temporary Inventory">
        <inventory-grid :inventory="characterDetails.inventories[1]"></inventory-grid>
      </b-tab-item>
      <b-tab-item label="Bank Inventory">
        <inventory-grid :inventory="characterDetails.inventories[2]"></inventory-grid>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script src="./Character.js"></script>
<style src="./Character.scss" lang="scss" scoped></style>