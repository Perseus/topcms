const ServerInfo = {
  name: 'server-info',
  props: {
    serverRates: {
      type: Object,
      default: () => {},
    },
    serverStats: {
      type: Object,
      default: () => {},
    }
  }
};

export default ServerInfo;
