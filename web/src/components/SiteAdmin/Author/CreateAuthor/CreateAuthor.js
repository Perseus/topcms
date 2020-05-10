import { ValidationObserver } from 'vee-validate';
import TInput from '@/components/ValidationInputs/TInput.vue';

const CreateAuthor = {
  name: 'admin-create-author',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    }
  },
  components: {
    TInput,
    ValidationObserver
  },
  data() {
    return {
      name: '',
    };
  },
  methods: {
    handleCreateAuthor() {
      this.$emit( 'createAuthor', this.name );
    },
  },
};

export default CreateAuthor;
