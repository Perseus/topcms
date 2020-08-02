<template>
  <div class="card server-info">
    <div class="card-content">
      <ul>
        <li class="server-rate">
          <span class="rate-name">Solo EXP:</span>
          <span class="rate-number">{{ rates.solo }}</span>
        </li>
        <li class="server-rate">
          <span class="rate-name">Party EXP:</span>
          <span class="rate-number">{{ rates.party }}</span>
        </li>
        <li class="server-rate">
          <span class="rate-name">Drop Rate:</span>
          <span class="rate-number">{{ rates.drop }}</span>
        </li>
        <li class="server-rate">
          <span class="rate-name">Ship EXP:</span>
          <span class="rate-number">{{ rates.ship }}</span>
        </li>
        <li class="server-rate">
          <span class="rate-name">Fairy EXP:</span>
          <span class="rate-number">{{ rates.fairy }}</span>
        </li>
      </ul>
    </div>
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import { BLoading } from 'buefy/dist/components/loading';

export default {
  name: "server-rates-container",

  components: {
    'b-loading': BLoading,
  },

  props: {
    rates: {
      type: Object,
      default: () => {}
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="scss" scoped>
.server-rate {
  display: flex;
  width: 100%;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}
</style>