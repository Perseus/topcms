import { BLoading } from 'buefy/dist/components/loading';

const StaffStatusContainer = {
  name: 'staff-status-container',

  components: {
    'b-loading': BLoading,
  },

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
