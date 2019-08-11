import { mapActions, mapGetters } from 'vuex';
import ActionTypes from '../../store/types/ActionTypes';
import RouteNames from '../../config/RouteNames';

const Login = {
  name: 't-login',
  data() {
    return {
      username: '',
      password: '',
    };
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
            this.$toast.open( {
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
    async onUserLogin() {
      try {
        const didFormValidationSucceed = await this.$validator.validateAll();
        if ( !didFormValidationSucceed ) {
          return;
        }
        this.loginUser( {
          username: this.username,
          password: this.password
        } );
      } catch ( err ) {
        const errorMessage = process.env.NODE_ENV === 'development' ? err : 'There was an error while trying to login.';
        this.$toast.open( {
          duration: 5000,
          message: errorMessage,
          position: 'is-bottom-right',
          type: 'is-danger',
        } );
      }
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
