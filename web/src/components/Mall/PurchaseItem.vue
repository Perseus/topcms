<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(triggerPurchase)" class="purchase-item-modal">
       <div class="card update-card">
        <header class="card-header">
          <div class="card-header-title">Purchase Item</div>
        </header>
        <div class="card-content">
          <TInput v-model="itemName" label="Item Name" disabled />
          <TInput v-model="quantity" label="Quantity" rules="required|numeric" />
        </div>
        <footer class="card-footer">
          <div class="card-footer-item">
            <b-button type="is-primary" :loading="isPurchasingItem" native-type="submit">Purchase using {{ totalPrice }} points</b-button>
          </div>
        </footer>
      </div>

    </form>
  </ValidationObserver>
</template>

<script>
import TInput from '@components/ValidationInputs/TInput';
import GraphQLRequest from '../../services/GraphQLRequest';

export default {
  name: 'purchase-item-modal',
  
  components: {
    TInput
  },

  props: {
    modalOptions: {
      type: Object, 
      default: () => {},
    },
  },

  data() {
    return {
      quantity: 1,
      itemName: '',
    };
  },

  computed: {
    isPurchasingItem() {
      return GraphQLRequest.isRequestInProgress('purchaseMallItem');
    },

    totalPrice() {
      return ( this.quantity * this.getItemPrice() );
    },
  },

  created() {
    this.itemName = this.getItemName();
  },


  methods: {
    triggerPurchase() {
      const item = this.modalOptions.itemData;

      if ( item.availableQuantity !== -1 && this.quantity > item.availableQuantity ) {
        this.$buefy.toast.open({
          message: `You cannot purchase ${this.quantity} of this item as there are only ${items.availableQuantity} units remaining.`,
          duration: 3000,
          type: 'is-warning'
        });

        return;
      }
      this.$emit('handlePurchase', { id: item.id, quantity: this.quantity } );
    },

    getItemName() {
      const item = this.modalOptions.itemData;
      return item.itemInfo.NAME;
    },

    getItemPrice() {
      const item = this.modalOptions.itemData;
      return item.price;
    },
  }
}

</script>
<style lang="scss" scoped></style>