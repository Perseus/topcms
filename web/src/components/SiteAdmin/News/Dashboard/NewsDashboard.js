const NewsDashboard = {
  name: 'admin-news-dashboard',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    news: {
      type: Array,
      default: () => []
    }
  },


  methods: {
    moveToCreateNewsPage() {
      this.$emit( 'moveToCreateNewsPage' );
    }
  }

};

export default NewsDashboard;
