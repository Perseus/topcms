const Login = {

  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    loginUser() {
      this.isLoading = true;
    }
  }
};


export default Login;