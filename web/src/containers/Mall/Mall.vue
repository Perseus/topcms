<template>
  <section class="main-mall-container">
    <b-modal :active="shouldShowPurchaseModal" @close="toggleModal" has-modal-card>
      <purchase-item
        v-if="shouldShowPurchaseModal"
        :modalOptions="modalState.options"
        @handlePurchase="handlePurchase"
      />
    </b-modal>


    <aside class="catgory-navigation">

      <section class="card current-user-details" v-if="isLoggedIn">
        <header class="card-header">
          <div class="card-header-title">
            Your Points
          </div>
        </header>
        <section class="card-content user-details-content">
          <div class="mall-points"> 
            <div class="points-desc">Mall Points: </div>
            <div class="points-num"> {{ user.mallPoints }} pts  </div> 
        </div>
          <div class="award-center-points"> 
            <div class="points-desc">Award Center Points: </div>
            <div class="points-num"> {{ user.awardCenterPoints }} pts </div>
         </div>
        </section>
      </section>

      <b-menu>
        <b-menu-list
        label="Categories">
          <b-menu-item v-for="category in mallCategories" :label="category.name" :active="isCategoryActive(category.id)" @click="toggleCategory(category.id)" :key="category.id"></b-menu-item>
        </b-menu-list>
      </b-menu>

    </aside>

    <section class="item-list-container">
      <div class="mall-items-list card" v-if="itemsList.length > 0">
        <div class="mall-item" v-for="item in itemsList" :key="item.id">

          <div class="card">
            <section class="card-content mall-item-content" @click="selectItem(item.id)">
              <div class="item-basic-details">
                <div class="item-icon-wrapper">
                  <img :src="getItemIcon(item)" class="item-icon" />
                </div>

                <div class="item-name-and-price">
                  <span class="item-name"> {{ getItemName(item) }} </span>
                  <span class="item-price"> <span style="font-weight: bold; ">{{ getItemPrice(item) }}</span> pts </span>
                </div>
              </div>

              <div class="item-more-details">
                <div class="item-availability" v-if="getItemAvailability(item) > -1">
                  <span class="avail-desc"> Available: </span>
                  <span class="avail-num"> {{ getItemAvailability(item) }} units</span>
                </div>
              </div>
            </section>

            <footer class="card-footer">
              <div class="card-footer-item purchase-btn" @click="togglePurchase(item.id)">Purchase</div>
            </footer>
          </div>

        </div>
      </div>
      <div class="no-items card" v-else>
        There are no items in this category right now.
      </div>
    </section>

    <aside class="item-details-container" v-if="selectedItem">
      <div class="box">
        <div class="box-contents">
          <span>Item Details</span>
          <span class="small-content"> Click an item to see it's details here </span>
        </div>

        <div class="item-details">
          <div class="item-basic-info">

            <div class="item-icon-wrapper">
              <img :src="selectedItemIcon" />
            </div>

            <div class="item-name-and-price">
              <span class="item-name"> {{ getItemName(selectedItem) }} </span>
              <span class="item-price"> <span style="font-weight: bold; ">{{ getItemPrice(selectedItem) }}</span> pts </span>
            </div>

          </div>

          <div class="item-specific-details">
            <div class="item-description">
              {{ getItemDescription(selectedItem) }}
            </div>

            <div class="item-trade-value">
              Trade Value: {{ getItemTradeValue(selectedItem) }}g
            </div>

          </div>
        </div>
      </div>
    </aside>

  </section>
</template>

<script src="./Mall.js"></script>
<style src="./Mall.scss" lang="scss" scoped></style>