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
    },

    toggleAuthDropdown() {
      this.showDropdown = !this.showDropdown;
    },

    hideAuthDropdown() {
      if (this.showDropdown) {
        this.showDropdown = false;
      }
    },
  },

  computed: {
    isUserLoggedIn() {
      return (this.$store.getters.userAuthStatus);
    }
  },
};


export default Navbar;
