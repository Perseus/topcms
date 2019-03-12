import { mapState } from 'vuex';
import errorHandlerMixin from '../../../mixins/errorHandler';
import Button from '../../../components/Button/Button.vue';
import TextInput from '../../../components/TextInput/TextInput.vue';
import _ from 'lodash';

const Register = {

  components: { Button, TextInput },
  data() {
    return {
      username: '',
      email: '',
      emailRepeat: '',
      password: '',
    };
  },
  mixins: [ errorHandlerMixin ],

  methods: {

    async registerUser() {

        const userDetails = {
          username: this.username,
          password: this.password,
          email: this.email
        };

        const userRegistrationStatus = await this.$store.dispatch('registerUser', userDetails);
        if (userRegistrationStatus.errors) {
          _.forEach(userRegistrationStatus.errors, (value, key) => {
            this.setError(key, value[0]);
          });
        }
    },

  },
  computed: {
    errorComputer() {
      console.log(this.user);
    },
    ...mapState({
      'user': state => state.user,
      'isLoggingIn': state => state.user.authenticationStatus.isLoggingIn
    }),
  },

  watch: {
    user() {
      console.log('USER CHANGED');
    }
  }
};

export default Register;