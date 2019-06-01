const Button = {
  props: {
    loaderCondition: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String
    }
  },
  data() {
    return {
      buttonStyle: {
        type: Object,
      },
    }
  },

  mounted() {
    this.buttonStyle = {
      "background-color": this.backgroundColor
    };
  },

  watch: {
    loadingCondition() {
      console.log( this.loadingCondition );
    }
  }
};

export default Button;
