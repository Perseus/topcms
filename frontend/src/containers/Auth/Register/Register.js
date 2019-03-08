import { mapState } from 'vuex';
import errorHandlerMixin from '../../../mixins/errorHandler';

const Register = {
  created() {
    this.$store.watch((state) => state.user.authenticationStatus, (oldVal, newVal) => {
      console.log(oldVal, newVal);
    });
  },
  data() {
    return {
      isLoading: false,
      username: '',
      email: '',
      emailRepeat: '',
      password: '',
    };
  },
  mixins: [ errorHandlerMixin ],

  methods: {
    registerUser() {

      if (this.email !== this.emailRepeat) {
        this.setError('emailRepeat', 'The repeated email does not match the original email.');
      } else {

        const userDetails = {
          username: this.username,
          password: this.password,
          email: this.email
        };

        this.$store.dispatch('registerUser', userDetails);
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