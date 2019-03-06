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
