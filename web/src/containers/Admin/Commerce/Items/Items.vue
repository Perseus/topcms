<template>
  <div class="manage-commerce-items">
    <div class="new-item-cta">
      <b-button type="is-primary" @click="showItemCreateModal">Add a mall item</b-button>
    </div>

    <b-table :loading="isFetchingMallItems" :data="mallItems">
      <template slot-scope="props">
        <b-table-column field="id" label="ID" width="40" numeric>{{ props.row.id }}</b-table-column>
        <b-table-column field="itemId" label="Item ID">{{ props.row.itemId }}</b-table-column>
        <b-table-column field="price" label="Price">{{ props.row.price }}</b-table-column>
        <b-table-column field="numOfItems" label="Number of Items">{{ props.row.numOfItems }}</b-table-column>
        <b-table-column field="availableQuantity" label="Available Quantity">{{ props.row.availableQuantity }}</b-table-column>
        <b-table-column field="mallType" label="Mall Type">{{ getTypeName(props.row.mallType) }}</b-table-column>
        <b-table-column field="category" label="Category">{{ props.row.category.name }}</b-table-column>
        <b-table-column field="actions" label="Actions" class="table-actions">
          <b-button
            class="edit-btn"
            type="is-warning"
            size="is-small"
            icon-left="edit"
            icon-pack="fas"
            @click="showItemEditModal(props.row.id)"
          >Edit</b-button>
          <b-button
            type="is-danger"
            size="is-small"
            icon-left="trash"
            icon-pack="fas"
            @click="toggleDeletePrompt(props.row.id)"
          >Delete</b-button>
        </b-table-column>
      </template>
    </b-table>

    <b-modal :active="shouldShowAddItemModal" @close="handleCloseModal" has-modal-card>
      <add-commerce-item
        @createCommerceItem="handleCreateItem"
        :isLoading="isCreatingCommerceItem"
        :mallCategories="commerceCategories"
        v-if="shouldShowAddItemModal"
      ></add-commerce-item>
    </b-modal>
    
    <b-modal :active="shouldShowEditItemModal" @close="handleCloseModal" has-modal-card>
      <edit-commerce-item
        @editCommerceItem="handleEditItem"
        :isLoading="isEditingCommerceItem"
        :mallCategories="commerceCategories"
        :modalOptions="modalOptions"
        v-if="shouldShowEditItemModal"
      ></edit-commerce-item>
    </b-modal>
  </div>
</template>

<script src="./Items.js"></script>
<style src="./Items.scss" lang="scss" scoped></style>