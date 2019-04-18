const Button = {
  props: {
    height: {
      type: Number
    },
    width: {
      type: Number
    },
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
      height: `${this.height}rem`,
      width: `${this.width}rem`,
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
