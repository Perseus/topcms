import Navbar from '../../components/Navbar/Navbar.vue';
import Sidebar from '../../components/Sidebar/Sidebar.vue';
import Modal from '../../components/Modal/Modal.vue';
import Toast from '../../components/Toast/Toast.vue';

import { mapState, mapActions } from 'vuex';

const Root = {

  created() {},

  components: {
    Navbar,
    Modal,
    Sidebar,
    'notify-toast': Toast
  },

  data() {
    return {
      asdf: 'ad',
      toastText: "",
    };
  },

  methods: {
    ...mapActions( [
      'triggerToast',
      'hideToast'
    ] ),
    logoutUser() {
      this.$store.dispatch( 'logoutUser', { onSuccessRedirect: 'root' } );
    },
    dismissToast() {
      this.hideToast();
    }
  },

  computed: {

    ...mapState( {
      userState: state => state.user,
      isToastVisible: state => state.application.isToastVisible,
      toastOptions: state => state.application.toastOptions,
    } ),
  },


};


export default Root;
