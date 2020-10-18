<template>
  <div class="card server-info">
    <header class="card-header">
      <div class="card-header-title">Server Information</div>
    </header>
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
      <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
    </div>
    <div class="card-footer"></div>
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
.server-info {
  width: 250px;
  background: transparent;
}
.server-rate {
  display: flex;
  width: 100%;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}

.card-header {
  background: url('~/img/assets/Menu_Head.png') no-repeat;
  min-height: 51px;
}

.card-header-title {
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  color: #F7AD3B;
}

.card-content {
  background: url('~/img/assets/Menu_Content.png') repeat-y;
  color: #F7AD3B;
  font-size: 14px;
}

.card-footer {
  height: 50px;
  border-top: none;
  background: url('~/img/assets/Menu_Bottom.png') no-repeat;
}
</style>