<template>
  <div class="item-mall-manager">
    <div class="new-item-cta">
      <b-button type="is-primary" @click="showItemCreateModal">Add item to mall/award center</b-button>
    </div>
    <b-tabs type="is-boxed" :animated="false">
      <b-tab-item v-for="category in commerceCategories" :key="category.id">
        <template slot="header">{{ category.name }}</template>
        <b-table :data="getCategoryItems(category.id)">
          <template slot-scope="props">
            <b-table-column field="id" label="ID" width="40" numeric>{{ props.row.id }}</b-table-column>
            <b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
            <b-table-column field="itemid" label="Item ID">{{ props.row.itemId }}</b-table-column>
            <b-table-column
              field="quantity"
              label="Available Quantity ( -1 means infinite )"
            >{{ props.row.availableQuantity }}</b-table-column>
            <b-table-column
              field="mall_type"
              label="Mall Type"
            >{{ getMallType( props.row.mallType ) }}</b-table-column>
            <b-table-column field="actions" label="Actions">
              <b-button
                class="edit-btn"
                type="is-warning"
                size="is-small"
                icon-left="edit"
                @click="showCategoryEditModal(props.row.id, props.row.name)"
              >Edit</b-button>
              <b-button
                type="is-danger"
                size="is-small"
                icon-left="trash"
                @click="toggleDeletePrompt(props.row.id)"
              >Delete</b-button>
            </b-table-column>
          </template>
        </b-table>
      </b-tab-item>
    </b-tabs>

    <b-modal :active="shouldShowItemCreateModal" @close="handleCloseModal" has-modal-card>
      <add-commerce-item
        @createCommerceItem="handleCreateItem"
        :isLoading="isCreatingCommerceItem"
        :mallTypes="mallTypes"
      ></add-commerce-item>
    </b-modal>

    <!-- <b-modal :active="shouldShowItemEditModal" @close="handleCloseModal" has-modal-card>
      <add-commerce-category
        @createCommerceCategory="handleCreateCategory"
        :isLoading="isCreatingCommerceCategory"
        :categoryCreationError="categoryCreationError"
      ></add-commerce-category>
    </b-modal>-->
  </div>
</template>

<script src="./ItemMall.js"></script>
<style src="./ItemMall.scss" lang="scss" scoped></style>