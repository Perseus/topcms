const SiteStatPanel = {

  name: 'site-stat-panel',

  props: {
    stats: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {

    }
  },
  computed: {
    displayStats() {
      return [
        {
          text: 'accounts',
          icon: 'users',
          color: '#2680C2',
          number: this.stats.accounts,
        },
        {
          text: 'characters',
          icon: 'users',
          color: '#D64545',
          number: this.stats.characters,
        },
        {
          text: 'online now',
          icon: 'gamepad',
          color: '#6CCC95',
          number: this.stats.online,
        },
        {
          text: 'online record',
          icon: 'medal',
          color: '#F4CA64',
          number: this.stats.online_record,
        }
      ];
    }
  },
};

export default SiteStatPanel;
