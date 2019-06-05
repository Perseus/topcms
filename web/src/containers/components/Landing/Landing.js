import { mapActions, mapGetters } from 'vuex';
import ServerInfo from '../../../components/ServerInfo/ServerInfo.vue';

const Landing = {
  name: 't-landing',
  components: {
    'server-info': ServerInfo
  }
};

export default Landing;
