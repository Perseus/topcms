import { mapActions, mapGetters } from 'vuex';

import ActionTypes from '../../store/types/ActionTypes';
import { changeRoute } from '../../utils/RouterUtils';
import RouteNames from '../../config/RouteNames';
import TInput from '../../components/ValidationInputs/TInput.vue';

const Register = {

  name: 'register-form',
  data() {
    return {
      username: '',
      password: '',
      email: '',
    };
  },
  components: {
    TInput
  },
  methods: {
    ...getActionDispatchers(),

    redirectToLogin() {
      this.changeRoute( {
        name: RouteNames.AUTH.LOGIN
      } );
    },

    onUserRegister() {
      this.registerUser( {
        username: this.username,
        password: this.password,
        email: this.email
      } );
    }
  },

  computed: {
    ...getStateGetters(),
  },

};

function getActionDispatchers() {
  return mapActions( {
    registerUser: ActionTypes.registerUser,
    changeRoute: ActionTypes.changeRoute,
  } );
}

function getStateGetters() {
  return mapGetters( {
    isUserRegistering: 'isUserRegistering'
  } );
}

export default Register;
