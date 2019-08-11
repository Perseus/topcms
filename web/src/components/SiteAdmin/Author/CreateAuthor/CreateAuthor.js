const CreateAuthor = {
  name: 'admin-create-author',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    authorCreationError: {
      type: String,
      default: '',
    }
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
