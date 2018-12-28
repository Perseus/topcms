const Navbar = {

  data() {
    return {
      'searchText': '',
    }
  },

  methods: {

    /**
     * Emit an event to open up the signup modal
     */
    openSignupModal() {

      this.$emit('onOpenAuthModal', {
        type: 'signup'
      });

    },

    /**
     * Emit an event to open up the login modal
     */
    openLoginModal() {

      this.$emit('onOpenAuthModal', {
        type: 'login'
      });

    }
  }
};


export default Navbar;
