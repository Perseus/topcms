import { mapActions, mapGetters } from 'vuex';
import { BButton } from 'buefy/dist/components/button';

import ActionTypes from '../../store/types/ActionTypes';
import RouteNames from '../../config/RouteNames';
import TInput from '../../components/ValidationInputs/TInput.vue';


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
    'b-button': BButton,
  },

  computed: {
    ...getStateGetters(),
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
  } );
}

export default Login;
