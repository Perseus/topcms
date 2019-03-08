const Navbar = {


  data() {
    return {
      searchText: '',
      showDropdown: false,
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
    },

    showAuthDropdown() {
      this.showDropdown = !this.showDropdown;
    }
  },

  computed: {
    isUserLoggedIn() {
      return (this.$store.getters.userAuthStatus);
    }
  },
};


export default Navbar;
