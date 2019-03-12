import { mapState } from 'vuex';
import errorHandlerMixin from '../../../mixins/errorHandler';
import Button from '../../../components/Button/Button.vue';
import TextInput from '../../../components/TextInput/TextInput.vue';

const Login = {

  data() {
    return {
      username: '',
      password: '',
      errors: [],
    };
  },

  components: { Button, TextInput },

  mixins: [ errorHandlerMixin ],

  methods: {
    
    loginUser() { 
      this.$store.dispatch('onUserLogin', { username: this.username, password: this.password } );
    },

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