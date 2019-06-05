import { mapActions, mapGetters } from 'vuex';

import ActionTypes from '../../store/types/ActionTypes';
import { changeRoute } from '../../utils/RouterUtils';
import RouteNames from '../../config/RouteNames';

const Register = {

  name: 'register-form',
  data() {
    return {
      username: '',
      password: '',
      email: '',
    };
  },
  methods: {
    ...getActionDispatchers(),
    redirectToLogin() {
      this.changeRoute( {
        name: RouteNames.AUTH.LOGIN
      } );
    },
    async onUserRegister() {
      try {
        const didFormValidationSucceed = await this.$validator.validateAll();
        if ( !didFormValidationSucceed ) {
          return;
        }
        this.registerUser( {
          username: this.username,
          password: this.password,
          email: this.email
        } );
      } catch ( err ) {
        this.$toast.open( {
          duration: 5000,
          message: `There was an error while trying to register your account.`,
          position: 'is-bottom-right',
          type: 'is-danger',
        } );
      }
    }
  },

  computed: {
    ...getStateGetters(),
  },

  watch: {
    authErrors( newVal ) {
      if ( newVal.length !== 0 ) {
        const errors = newVal;
        errors.forEach( ( error ) => {
          if ( error.code === 'NAME_EXISTS' ) {
            this.errors.add( {
              field: 'username',
              msg: 'Username already exists',
            } );
          }

          if ( error.code === 'EMAIL_EXISTS' ) {
            this.errors.add( {
              field: 'email',
              msg: 'Email already exists'
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
  }
};

function getActionDispatchers() {
  return mapActions( {
    registerUser: ActionTypes.registerUser,
    changeRoute: ActionTypes.changeRoute,
  } );
}

function getStateGetters() {
  return mapGetters( {
    isUserRegistering: 'isUserRegistering',
    authErrors: 'authErrors',
  } );
}

export default Register;
