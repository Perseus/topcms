<template>
  <template-card>
    <template slot="title"> Your Account </template>
    <template slot="card-content">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onUserLogin)">
          <TInput label="Username" rules="required" v-model="username" name="Username"/>
          <TInput label="Password" type="password" rules="required|min:5" v-model="password" name="Password"/>
          <div class="cta">
            <div class="small-action-group">
              <a
                href="#"
                class="forgot-password"
                @click.prevent="redirectToForgot"
              >Forgot Password?</a>
            </div>
            <b-button
              type="is-primary"
              native-type="submit"
              class="login-btn"
              data-test="login-button"
              :loading="isUserLoggingIn"
            >
              Login
            </b-button>
          </div>
        </form>
      </ValidationObserver>
    </template>
  </template-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateCard from '../TemplateCard/TemplateCard';
import TInput from '@components/ValidationInputs/TInput';
import { BButton } from 'buefy/dist/components/button';

import RouteNames from '../../config/RouteNames';
import ActionTypes from '@store/types/ActionTypes';

export default {
  name: 'sidebar-login-card',

  components: {
    'template-card': TemplateCard,
    TInput,
    'b-button': BButton,
  },

  data() {
    return {
      username: '',
      password: '',
    };
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
}

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

</script>

<style lang="scss" scoped>
  .cta {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .login-btn {
    margin-top: 0.5rem;
  }

  .card-content {
    padding: 0 1.5rem;
  }
</style>