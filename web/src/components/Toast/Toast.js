const Toast = {
  name: 'notify-toast',
  props: {
    options: {
      type: Object,
      default: () => {},
    }
  },

  data() {
    return {
      toastDismissTime: 3000,
    };
  },

  mounted() {
    this.toastDismissTimeout = setTimeout( () => {
      this.dismissToast();
    }, 3000 );
  },

  beforeDestroy() {
    if ( this.toastDismissTimeout ) {
      clearTimeout( this.toastDismissTimeout );
    }
  },

  methods: {
    dismissToast() {
      this.$emit( 'dismissToast' );
    }
  }

};


export default Toast;
