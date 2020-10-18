<template>
  <template-card>
    <template slot="title"> Your Account </template>
    <template slot="card-content">
      <div class="my-account-details">
        <div class="username-wrapper"> 
          Your account name is <span class="username"> {{ userData.username }} </span>
        </div>
        <div class="account-nav-links">
          <a @click.prevent="handleRedirect('admin')" v-if="canAccessGameAdmin">Admin Panel</a>
          <a @click.prevent="handleRedirect('account')">Your Account</a>
          <a @click.prevent="handleRedirect('storage')">Storage Box</a>
          <a @click.prevent="handleRedirect('logout')">Logout</a>
        </div>

      </div>
    </template>
  </template-card>
</template>

<script>

import TemplateCard from '@components/TemplateCard/TemplateCard';
import GeneralConfig from '../../config/GeneralConfig';

export default {
  name: 'sidebar-my-account-card',
  components: {
    'template-card': TemplateCard,
  },

  props: {
    userData: {
      type: Object,
      default: () => {},
    }
  },

  computed: {
    canAccessGameAdmin() {
      return ( this.userData.permissions.includes( GeneralConfig.ACCESS_LEVELS.ADMIN ) );
    },
  },

  methods: {
    handleRedirect(name) {
      this.$emit( 'handleRedirect', { name } );
    }
  },
};

</script>
<style lang="scss" scoped>
  .my-account-details {
    font-weight: normal;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .username {
    font-weight: bold;
  }

  .account-nav-links {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
  }


</style>