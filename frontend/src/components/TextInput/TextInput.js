import Tooltip from '../Tooltip/Tooltip.vue';

const TextInput = {

  props: {
    placeholder: {
      type: String
    },
    name: {
      type: String
    },
    inputType: {
      type: String,
      default: 'text'
    },
    error: {
      type: String,
      default: undefined
    }
  },

  components: { Tooltip },
};

export default TextInput;