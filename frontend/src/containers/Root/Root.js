
import Navbar from '../../components/Navbar/Navbar.vue';
import Sidebar from '../../components/Sidebar/Sidebar.vue';
import Modal from '../../components/Modal/Modal.vue';
import { mapState } from 'vuex';

const Root = {

  created() {
  },

  components: { Navbar, Modal, Sidebar },

  data() {
    return {
        asdf: 'ad'
    };
  },

  methods: {
    logoutUser() {
      this.$store.dispatch( 'logoutUser', { onSuccessRedirect: 'root' } );
    }
  },

  computed: {

    ...mapState({
      userState: state => state.user
    }),
  }
  
};


export default Root;
