import { format, distanceInWordsToNow } from 'date-fns';

const SiteDashboard = {
  name: 'site-dashboard',

  props: {
    authors: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      navigationCategories: {},
      selectedNavigation: '',
    };
  },

  created() {
    this.navigationCategories = SiteManagementConstants.CATEGORIES;
    this.selectedNavigation = this.navigationCategories.NEWS;
  },

  computed: {
    selectedNavItem() {
      return this.selectedNavigation;
    },
    selectedNavItemColumns() {
      return this.selectedNavigation.columns;
    },
    tableContents() {
      return this.getTableContents( this.selectedNavigation );
    },
  },

  methods: {
    isNavSelected( navigationName ) {
      return ( this.selectedNavigation.title === navigationName );
    },
    selectNavItem( navigationName ) {
      this.selectedNavigation = ( _.find( this.navigationCategories, ( category ) => {
        return ( category.title === navigationName );
      } ) );
    },
    getTableContents( navigation ) {
      const dataToTabulate = this[ navigation.title.toLowerCase() ];
      if ( !dataToTabulate ) {
        return [];
      }
      const parsedData = [];

      dataToTabulate.forEach( ( data ) => {
        const { id, createdAt } = data;
        let descriptorName = '';
        switch ( navigation.title ) {
          case 'News':
          case 'Downloads':
          case 'Polls':
            descriptorName = 'title';
            break;
          case 'Authors':
            descriptorName = 'name';
            break;
        }
        const parsedCreatedDate = distanceInWordsToNow(
          ( createdAt * 1 )
        );
        const descriptor = data[ descriptorName ];
        parsedData.push( {
          id,
          descriptor,
          createdAt: `${parsedCreatedDate} ago`
        } );
      } );

      return parsedData;
    },
    editItem( itemId ) {
      this.$emit( 'edit', {
        id: itemId,
        type: this.selectedNavigation
      } );
    },
    deleteItem( itemId ) {
      this.$emit( 'delete', {
        id: itemId,
        type: this.selectedNavigation
      } );
    },
    handleCreateCTAClick() {
      let createItemLink = '';
      switch ( this.selectedNavigation.title ) {
        case 'Downloads':
          createItemLink = 'create-download';
          break;
        case 'Authors':
          createItemLink = 'create-author';
          break;
        case 'News':
          createItemLink = 'create-news';
          break;
        case 'Polls':
          createItemLink = 'create-poll';
          break;
      }
      this.$emit( 'create', createItemLink );
    },
  },

};

export default SiteDashboard;
