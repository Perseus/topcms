const SidebarNavigationContainer = {
  name: 'sidebar-navigation',
  methods: {
    redirectToHome() {

    },
    redirectTo( page ) {
      this.$emit( 'redirectToPage', page );
    }
  },
};

export default SidebarNavigationContainer;
