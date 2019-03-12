
const Button = {

  props: {
    height: {
      type: String,
    },
    width: {
      type: String,
    },
    loaderCondition: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
    }
  },


  watch: {
    loadingCondition() {
      console.log(this.loadingCondition);
    }
  }
};


export default Button;
