import Tooltip from '../Tooltip/Tooltip.vue';
import _ from 'lodash';

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

  computed: {
    shouldShowErrorTooltip() {
      return ( _.isEmpty( this.error ) ? false : true );
    }
  }
};

export default TextInput;