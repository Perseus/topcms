<template>
  <section class="storage-box-container card">
    <header class="card-header">
      <div class="card-header-title">
        Storage Box
      </div>
    </header>
    <div class="card-content">
      <div class="no-items-found" v-if="isStorageBoxEmpty">
        There are currently no items in your storage box. <br />
        Please purchase an item at the Item Mall or Award Center.
      </div>

      <div class="storage-box" v-else>

        Pick an item to transfer to the game.

        <div class="storage-box-item-grid">
          <div class="storage-box-item" v-for="item in storageBox.itemsData" :key="item.id" @click="toggleItemSelect(item.id)">
            <img :src="getItemIcon(item)" />
            <div class="storage-box-item-selected" v-if="selectedItem === item.id">
              <b-icon type="is-success" icon="check" size="is-small" pack="fas"></b-icon>
            </div>
          </div>
        </div>

        Pick a character to transfer the item to.

        <div class="character-list">
          <div class="character-item" v-for="char in charactersDetails" :key="char.id" @click="selectCharacter(char)">
            <div class="character-image-wrapper">

              <img :src="getCharacterIcon(char)" class="character-image" />
              <div class="character-disabled-overlay" v-if="isCharacterOnline(char)">
                Character is online
              </div>

              <div class="character-selected-overlay" v-if="selectedCharacter === char.cha_id">
                <b-icon type="is-success" icon="check" size="is-small" pack="fas"></b-icon>
              </div>

            </div>
            <div class="character-name"> {{ char.cha_name }} </div>
          </div>
        </div>

        <div class="transfer-button-wrapper">
          <b-button type="is-primary" :loading="isTransferringItem" class="transfer-btn" native-type="submit" @click="transferItem">Transfer item to character</b-button>
        </div>

      </div>
    </div>
  </section>
</template>

<script src="./StorageBox.js"></script>
<style src="./StorageBox.scss" lang="scss" scoped></style>