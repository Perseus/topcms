
export default {
  name: 'inventory-item-tooltip',

  props: {
    tooltipContent: {
      type: String,
      default: '',
    },

    tooltipStyles: {
      type: Object,
      default: () => {},
    },

    showTooltipOnHover: {
      type: Boolean,
      default: true,
    }
  },

  data() {
    return {
      shouldShowTooltip: false
    };
  },

  created() {

  },


  methods: {
  }
};
