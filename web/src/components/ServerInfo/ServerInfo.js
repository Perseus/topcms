import { BLoading } from 'buefy/dist/components/loading';

const ServerInfo = {
  name: 'server-info',

  components: {
    'b-loading': BLoading
  },

  props: {
    serverRates: {
      type: Object,
      default: () => {},
    },
    gameStats: {
      type: Object,
      default: () => {},
    },
    isLoading: {
      type: Boolean,
      default: false,
    }
  }
};

export default ServerInfo;
