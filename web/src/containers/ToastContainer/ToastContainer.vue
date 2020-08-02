<template>
  <div class="toasts-container">
    <transition-group name="toast" tag="div">
      <t-toast v-for="toast in toastsToShow" :type="toast.type" :key="toast.identifier">
        {{ toast.content }}
      </t-toast>
    </transition-group>
  </div>

</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import Toast from '@components/Toast/Toast';

  export default {
    name: 't-toasts',

    components: {
      't-toast': Toast,
    },

    created() {
      
    },

    computed: {
      ...mapStateToComputed(),

      toastsToShow() {
        return this.toasts;
      }
    },

    methods: {
      ...mapActionsToMethods(),
    },
  }


  function mapStateToComputed() {
    return mapState({
      toasts: state => state.application.toasts,
    });
  }

  function mapActionsToMethods() {
    return mapActions({
      triggerToast: 'triggerToast'
    });
  }

</script>
<style lang="scss" scoped>
  .toasts-container {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999999;
    margin-right: 20px;

    & > div {
      display: flex;
      flex-direction: column-reverse;
    }
  }
  
  .toast-enter-active {
    opacity: 0;
    transform: translateX(calc(100% + 50px));
    transition: all 0.2s ease-out;
  }

  .toast-enter-to {
    opacity: 1;
    transform: translateX(0);
  }

  .toast-move {
    transition: transform .5s;
  }

  .toast-leave {
    opacity: 1;
    transition: all .2s ease-out;
    transform: translateX(0);
  }

  .toast-leave-to {
    opacity: 1;
    transition: all .2s ease-out;
    transform: translateX(calc(100% + 50px));
  }
  </style>