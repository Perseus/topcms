const Tooltip = {

  props: {
    type: {
      type: String,
      default: 'error'
    },
    position: {
      type: Object,
      default: {},
    },
    hook: {
      type: String,
      default: 'left'
    }
  },
};

export default Tooltip;
