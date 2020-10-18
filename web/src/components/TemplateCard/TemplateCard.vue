<template>
  <div :class="['card', size ]">
    <header :class="['card-header', size ]">
      <div class="card-header-title">
        <slot name="title"></slot>
      </div>
    </header>

    <div :class="['card-content', size ]">
      <slot name="card-content"></slot>
    </div>

    <div :class="['card-footer', size ]">
      <div class="card-footer-text">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'template-card',

    props: {
      size: {
        type: String,
        default: 'small',
      }
    }
  };
</script>
<style lang="scss" scoped>
  .card {
    &.small {
      width: 250px;
    }

    &.large {
      width: 488px;
    }
    background-color: transparent;
  }

  .card-header {
    &.small {
      background: url('~/img/assets/Menu_Head.png') no-repeat;
      min-height: 51px;
    }

    &.large {
      min-height: 42px;
      background: url('~/img/assets/M_Main_Head.png') no-repeat;
    }
  }

  .card-header-title {
    color: #F7AD3B;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    justify-content: center;
  }


  .card-content {
    &.small {
      background: url('~/img/assets/Menu_Content.png') repeat-y;
    }

    &.large {
      background: url('~/img/assets/M_Main_Content.png') repeat-y;
    }
    color: #F7AD3B;
    font-weight: bold;
    font-size: 14px;
  }

  .card-footer {
    height: 50px;
    border-top: none;

    &.small {
      background: url('~/img/assets/Menu_Bottom.png') no-repeat;
    }

    &.large {
      background: url('~/img/assets/M_Main_Bottom.png') no-repeat;
    }
  }

  .card-footer-text {
    padding: 20px 0 0 25px;
    font-size: 12px;
    color: #F7AD3B;
    font-weight: bold;
    width: 100%;
    margin-left: 5px;
    display: flex;
  }
</style>