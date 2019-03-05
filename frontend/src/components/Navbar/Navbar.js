const Navbar = {


  data() {
    return {
      searchText: '',
    }
  },
  props: {
    user: {
      type: Object,
      default: {}
    },
  },

  methods: {

    logoutUser() {
      this.$emit('onLogoutUser');
      // this.showAuthDropdown();
    }
  },

  watch: {
    user (newVal) {
      console.log(newVal);
    }
  },

  computed: {
    isUserLoggedIn() {
      return (this.user.isLoggedIn);
    }
  },
};


export default Navbar;
