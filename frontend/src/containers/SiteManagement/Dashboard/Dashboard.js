import { getAuthorsQuery } from '../../../apollo/queries/admin/site';


const Dashboard = {

  name: 'dashboard',

  apollo: {
    authors: getAuthorsQuery,
  },
  data() {
    return {
      authors: [],
    };
  },

  created() {},
  methods: {

    editItem( { id, type } ) {
      this.$router.push( {
        name: `edit-${type.title.toLowerCase()}`,
        params: {
          id
        }
      } );
    },

    deleteItem( itemId ) {

    },

    createItem( itemLink ) {
      this.$router.push( {
        name: itemLink
      } );
    }
  },



};

export default Dashboard;
