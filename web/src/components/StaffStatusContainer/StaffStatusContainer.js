const StaffStatusContainer = {
  name: 'staff-status-container',
  props: {
    staffInfo: {
      type: Array,
      default: () => [],
    },
    isFetchingStaffInfo: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    isStaffOnline( status ) {
      return ( status === true );
    }
  }
};

export default StaffStatusContainer;
