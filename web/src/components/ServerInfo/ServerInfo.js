const ServerInfo = {
  name: 'server-info',
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
