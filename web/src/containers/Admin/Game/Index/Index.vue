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
          <b-button class="is-pulled-right search-btn" native-type="submit">Search</b-button>
        </form>
      </div>
    </div>
    <div class="mall-handle-section"></div>
    <div class="other-actions-section"></div>
  </div>
</template>

<script src="./Index.js"></script>
<style src="./Index.scss" lang="scss" scoped></style>