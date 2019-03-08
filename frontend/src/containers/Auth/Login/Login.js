import { mapState } from 'vuex';

const Login = {

  created() {
  },

  data() {
    return {
      username: '',
      password: '',
      errors: [],
    };
  },

  methods: {
    
    loginUser() { 
      this.$store.dispatch('onUserLogin', { username: this.username, password: this.password } );
    },

    getError( errorType ) {
      if ( errorType in this.user.authenticationStatus.errors ) {
        this.errors[errorType] = this.user.authenticationStatus.errors[errorType][0];
        return true;
      }
      return false;
    }

  },

  computed: {
    ...mapState({
      'user': state => state.user,
      'isLoggingIn': state => state.user.authenticationStatus.isLoggingIn
    }),
  },

  watch: {
    user (newVal) {
      console.log(newVal);
    }
  }


};


export default Login;