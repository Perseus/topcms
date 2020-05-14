
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
    TInput
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
