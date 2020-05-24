import { mapActions } from 'vuex';

import RouteNames from '../../config/RouteNames';
import ActionTypes from '../../store/types/ActionTypes';

const SidebarNavigationContainer = {
  name: 'sidebar-navigation',
  methods: {
    ...mapActionsToMethods(),

    redirectTo( page ) {
      switch ( page ) {
        case 'news':
          this.changeRoute( { name: RouteNames.ROOT.NEWS.LIST } );
          break;
        case 'home':
          this.changeRoute( { name: RouteNames.ROOT.__LANDING__ } );
          break;
        case 'mall':
          this.changeRoute( { name: RouteNames.COMMERCE.ITEM_MALL } );
          break;
        case 'awardCenter':
          this.changeRoute( { name: RouteNames.COMMERCE.AWARD_CENTER } );
          break;
        case 'downloads':
          this.changeRoute( { name: RouteNames.ROOT.DOWNLOAD.LIST } );
          break;
        case 'ranking':
          this.changeRoute( { name: RouteNames.ROOT.RANKING.__LANDING__ } );
          break;
        default:
          break;
      }
    }
  },
};

function mapActionsToMethods() {
  return mapActions( {
    changeRoute: ActionTypes.changeRoute
  } );
}

export default SidebarNavigationContainer;
