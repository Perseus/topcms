<template>
  <div :class="[ 'toast', type ]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 't-toast',

    props: {
      type: {
        type: String,
        default: '',
      }
    }
  };
</script>

<style lang="scss" scoped>

  .toast {
    display: flex;
    margin: 0.5em 0;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);
    opacity: 0.92;
    padding: .75em 1.5em;
    background-color: #363636;
    color: #FFFFFF;
    border-radius: 2em;

    &.error {
      color: #FFFFFF;
      background: #FF3860;
    }

    &.success {
      color: #FFFFFF;
      background: #23d160;
    }
  }

</style>