const errorHandlerMixin = {

  created() {
    console.log('created');
  },
  
  data() {
    return {
      errors: {},
    };
  },
  
  methods: {

    existsError( name ) {
      if (name in this.errors) {
        return true;
      }
      return false;
    },

    getError( name ) {
      return this.errors[name];
    },

    setError( name, value ) {
      // need to add new value to object like this due to vuejs reactivity restrictions
      let newError = {};
      newError[name] = value;
      this.errors = Object.assign({}, this.errors, newError);
      console.log(this.errors);
    }

  },
};

export default errorHandlerMixin;
