
import Navbar from '../../components/Navbar/Navbar.vue';
import Sidebar from '../../components/Sidebar/Sidebar.vue';
import Modal from '../../components/Modal/Modal.vue';
import AuthModal from '../../components/AuthModal/AuthModal.vue';

const Root = {

  components: { Navbar, Sidebar, Modal, AuthModal },

  data() {
    return {
        asdf: 'ad'
    };
  },

  methods: {

    openAuthModal ( type ) {
      this.$store.dispatch ( 'changeAuthModalState',  type );
    },

    onCloseAuthModal() {
      this.$store.dispatch ( 'changeAuthModalState' , {} );
    }
  }
  
};


export default Root;
