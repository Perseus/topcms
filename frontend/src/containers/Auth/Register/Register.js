const Register = {
  created() {

  },
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    registerUser() {
      this.isLoading = true;
    },
  }
  
};

export default Register;