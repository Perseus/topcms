const SiteStatPanel = {

  name: 'site-stat-panel',

  data() {
    return {
      stats: [
        {
          text: 'accounts',
          icon: 'users',
          color: '#2680C2',
          number: 53,
        },
        {
          text: 'characters',
          icon: 'users',
          color: '#D64545',
          number: 180,
        },
        {
          text: 'online now',
          icon: 'gamepad',
          color: '#6CCC95',
          number: 100,
        },
        {
          text: 'online record',
          icon: 'medal',
          color: '#F4CA64',
          number: 180,
        }
      ]
    };
  },
};

export default SiteStatPanel;