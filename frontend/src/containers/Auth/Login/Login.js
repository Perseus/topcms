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
      if ( errorType in this.userState.authenticationStatus.errors ) {
        this.errors[errorType] = this.userState.authenticationStatus.errors[errorType][0];
        return true;
      }
      return false;
    }

  },

  computed: {
    usernameError() {
      return this.getError ('username');
    },
    passwordError() {
      return this.getError ('password');
    },
    credentialsError() {
      return this.getError ('credentials');
    },
    ...mapState({
      'userState': state => state.userState,
      'isLoggingIn': state => state.userState.authenticationStatus.isLoggingIn
    }),
  },

  watch: {
    userState (newVal) {
      console.log(newVal);
    }
  }


};


export default Login;