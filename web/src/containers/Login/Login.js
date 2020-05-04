import { mapActions, mapGetters } from 'vuex';
import ActionTypes from '../../store/types/ActionTypes';
import RouteNames from '../../config/RouteNames';
import TInput from '../../components/ValidationInputs/BInputWithValidation.vue';

const Login = {
  name: 't-login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  components: {
    TInput,
  },
  computed: {
    ...getStateGetters(),
  },
  watch: {
    authErrors( newVal ) {
      if ( newVal.length !== 0 ) {
        const errors = newVal;
        errors.forEach( ( error ) => {
          if ( error.code === 'INCORRECT_CREDENTIALS' ) {
            this.$buefy.toast.open( {
              duration: 3000,
              message: 'The username or the password is incorrect',
              position: 'is-top',
              type: 'is-danger',
            } );
          }

          if ( error.code === 'CONSTRAINT_ERROR' ) {
            this.errors.add( {
              field: error.field,
              msg: error.msg
            } );
          }
        } );
      }
    }
  },

  methods: {
    ...getActionDispatchers(),
    onUserLogin() {
      this.loginUser( {
        username: this.username,
        password: this.password
      } );
    },
    redirectToSignup() {
      this.changeRoute( {
        name: RouteNames.AUTH.REGISTER
      } );
    },
    redirectToForgot() {

    }
  }
};

function getActionDispatchers() {
  return mapActions( {
    loginUser: ActionTypes.loginUser,
    changeRoute: ActionTypes.changeRoute
  } );
}

function getStateGetters() {
  return mapGetters( {
    isUserLoggingIn: 'isUserLoggingIn',
    authErrors: 'authErrors',
  } );
}

export default Login;
