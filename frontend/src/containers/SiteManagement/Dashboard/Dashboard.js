import SiteStatPanel from '../../../components/SiteStatPanel/SiteStatPanel.vue';
import gameStats from '../../../utils/graphql/queries/SiteManagement/gameStats.gql';
import gql from 'graphql-tag';

const Dashboard = {

  name: 'dashboard',

  components: { SiteStatPanel },

  apollo: {
    gameStats,
  },

  data() {
    return {
      gameStats
    };
  },
  
};

export default Dashboard;