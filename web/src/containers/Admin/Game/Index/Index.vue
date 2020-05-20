<template>
  <div class="game-admin-index">
    <div class="account-search-section card">
      <header class="card-header">
        <p class="card-header-title">Account Search</p>
      </header>
      <div class="card-content">
        <form @submit.prevent="searchAccounts">
          <b-field label="Value">
            <b-input v-model="accountSearchTerm"></b-input>
          </b-field>
          <b-field label="Filter">
            <b-dropdown v-model="selectedAccountSearchFilter" aria-role="list">
              <button class="button is-primary" type="button" slot="trigger">
                <span>{{ selectedAccountSearchFilter }}</span>
                <b-icon icon="caret-down" size="is-small"></b-icon>
              </button>
              <b-dropdown-item
                v-for="(value, key) in accountSearchFilters"
                :key="key"
                :value="value"
                aria-role="listitem"
              >{{value }}</b-dropdown-item>
            </b-dropdown>
          </b-field>
          <b-button
            class="is-pulled-right search-btn"
            :loading="isFetchingAccounts"
            native-type="submit"
          >Search</b-button>
        </form>
      </div>
    </div>

    <div class="character-search-section card">
      <header class="card-header">
        <p class="card-header-title">Character Search</p>
      </header>
      <div class="card-content">
        <form @submit.prevent="searchCharacters">
          <b-field label="Value">
            <b-input v-model="characterSearchTerm"></b-input>
          </b-field>
          <b-field label="Filter">
            <b-dropdown v-model="selectedCharacterSearchFilter" aria-role="list">
              <button class="button is-primary" type="button" slot="trigger">
                <span>{{ selectedCharacterSearchFilter }}</span>
                <b-icon icon="caret-down" size="is-small"></b-icon>
              </button>
              <b-dropdown-item
                v-for="(value, key) in characterSearchFilters"
                :key="key"
                :value="value"
                aria-role="listitem"
              >{{value }}</b-dropdown-item>
            </b-dropdown>
          </b-field>
          <b-button
            class="is-pulled-right search-btn"
            :loading="isFetchingCharacters"
            native-type="submit"
          >Search</b-button>
        </form>
      </div>
    </div>
    <div class="mall-handle-section">
      <div class="manage-mall-section card">
        <header class="card-header">
          <p class="card-header-title">Manage Commerce</p>
        </header>
        <div class="manage-mall-card card-content">
          <b-button
            class="is-button is-primary"
            @click="redirectToMallCategories"
          >Manage Mall Categories</b-button>
          <b-button class="is-button is-primary" @click="redirectToMallItems">Manage Item Mall</b-button>
        </div>
      </div>
    </div>
    <div class="other-actions-section">
      <div class="manage-iteminfo-sectiona card">
        <header class="card-header">
          <p class="card-header-title">Manage ItemInfo</p>
        </header>
        <div class="card-content">
          <b-button
            @click="openItemInfoUploadWindow"
            class="upload-iteminfo is-button is-primary"
            :loading="isUploadingItemInfo"
          >Upload ItemInfo</b-button>
          <input
            type="file"
            ref="iteminfoUploadInput"
            @change="handleIteminfoUpload"
            v-show="false"
          />
          <b-button
            @click="generateItemInfoCache"
            class="generate-item-info-cache is-button is-primary"
          >Generate Iteminfo Cache</b-button>
          <div class="item-info-cache-progress" v-if="shouldShowCachingProgressBar">
            <h2 class="has-size-6">ItemInfo caching...</h2>
            <b-progress
              class="item-info-cache-bar"
              :value="itemCachedPercentage"
              type="is-success"
              show-value
            >{{ totalItemsCached }}/{{ totalItemsToCache }}</b-progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Index.js"></script>
<style src="./Index.scss" lang="scss" scoped></style>