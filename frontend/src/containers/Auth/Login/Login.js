import { mapState } from 'vuex';
import errorHandlerMixin from '../../../mixins/errorHandler';
import Button from '../../../components/Button/Button.vue';
import TextInput from '../../../components/TextInput/TextInput.vue';
import FormError from '../../../components/FormError.vue';

const Login = {

  data() {
    return {
      username: '',
      password: '',
      errors: [],
    };
  },

  components: { 
    Button, 
    TextInput,
    'form-error': FormError 
  },

  mixins: [ errorHandlerMixin ],

  methods: {
    
    async loginUser() {
      try {
        this.clearErrors();
        const userLoginStatus = await this.$store.dispatch('onUserLogin', { username: this.username, password: this.password, onSuccessRedirect: 'root' } );

        if (userLoginStatus.errors) {
          _.forEach(userLoginStatus.errors, (value, key) => {
            this.setError(key, value[0]);
          });

          if (userLoginStatus.errors.credentials) {
            this.setError('all', userLoginStatus.errors.credentials[0]);
          }
          
        }

      } catch (err) {
        this.setError('all', 'An error occured while trying to log in. Please try again', err);
      }
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