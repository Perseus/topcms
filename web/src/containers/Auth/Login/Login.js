import { mapState, mapActions } from 'vuex';
import * as ActionTypes from '../../../store/action-types';
import RouteNames from '../../../config/RouteNames';

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
    ...getActionDispatchers(),
  },
  computed: {},

  watch: {

  }


};

function getActionDispatchers() {
  return mapActions( {
    loginUser: `user/${ActionTypes.loginUser}`,
    changeRoute: `router/${ActionTypes.changeRoute}`,
  } );
}

export default Login;
