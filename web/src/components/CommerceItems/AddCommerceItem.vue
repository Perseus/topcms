<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handleCreateItem)">
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Create Mall Item</p>
        </header>
        <section class="modal-card-body">
          <TInput v-model="itemId" name="Item ID" placeholder="681" label="Item ID" rules="required|numeric" />
          <TInput v-model="price" name="Price" placeholder="400" label="Item Price" rules="required|numeric" />
          <TInput v-model="availableQuantity" name="Available Quantity" placeholder="-1" label="Available Quantity (-1 for unlimited)" rules="required|integer" />
          <TInput v-model="numOfItems" name="Number of items" placeholder="1" label="Number of items (how many of this item should be given to the player)" rules="required|numeric" />
          
          <b-field label="Mall Category">
            <b-dropdown v-model="category" aria-role="list" v-if="areThereMallCategories">
              <button class="button is-primary" type="button" slot="trigger">
                <span>{{ getCategoryName(category) }}</span>
                <b-icon icon="caret-down" size="is-small" pack="fas"></b-icon>
              </button>
              <b-dropdown-item
                v-for="(category, index) in mallCategories"
                :key="index"
                :value="index"
                aria-role="listitem"
              >{{ category.name }}</b-dropdown-item>
            </b-dropdown>
          </b-field>

          <b-field label="Mall Type">
            <b-dropdown v-model="mallType" aria-role="list">
              <button class="button is-primary" type="button" slot="trigger">
                <span>{{ getTypeName(mallType) }}</span>
                <b-icon icon="caret-down" size="is-small" pack="fas"></b-icon>
              </button>
              <b-dropdown-item
                v-for="(mallType, key) in Constants.MALL_TYPES"
                :key="key"
                :value="mallType"
                aria-role="listitem"
              >{{ getTypeName(mallType) }}</b-dropdown-item>
            </b-dropdown>
          </b-field>


        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button
            :class="[ 'button', 'is-success', { 'is-loading': isLoading } ]"
            type="submit"
          >Create item</button>
        </footer>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { BField } from 'buefy/dist/components/field';
import { BDropdown, BDropdownItem } from 'buefy/dist/components/dropdown';
import { BIcon } from 'buefy/dist/components/icon';

import TInput from '@components/ValidationInputs/TInput';
import Constants from '../../config/GeneralConfig';


export default {
  name: 'add-commerce-category',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },

    mallCategories: {
      type: Array,
      default: () => []
    }
  },

  components: {
    TInput,
    'b-field': BField,
    'b-dropdown': BDropdown,
    'b-dropdown-item': BDropdownItem,
    'b-icon': BIcon,
  },

  data() {
    return {
      itemId: 0,
      price: 0,
      availableQuantity: -1,
      numOfItems: 1,
      category: 0,
      mallType: Constants.MALL_TYPES.ITEM_MALL,
      Constants
    };
  },

  methods: {
    handleCreateItem() {
      const categoryId = this.mallCategories[this.category].id;
      this.$emit('createCommerceItem', { itemId: parseInt(this.itemId), price: parseFloat(this.price), availableQuantity: parseInt(this.availableQuantity), numOfItems: parseInt(this.numOfItems), categoryId, mallType: this.mallType });
    },

    getCategoryName(category) {
      const cat = this.mallCategories[category];
      return cat.name;
    },

    getTypeName(type) {
      switch ( type ) {
        case 'MALL':
          return 'Item Mall';
        case 'AWARD':
          return 'Award Center';
      }
    }
  },

  computed: {
    areThereMallCategories() {
      return ( this.mallCategories.length > 0 );
    }
  }
};
</script>
<style lang="scss" scoped></style>