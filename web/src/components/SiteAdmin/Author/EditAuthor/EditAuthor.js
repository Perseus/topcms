
import TInput from '@components/ValidationInputs/TInput.vue';

const EditAuthor = {
  name: 'admin-edit-author',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    authorEditingError: {
      type: String,
      default: '',
    },
    authorDetails: {
      type: Object,
      default: '',
    }
  },

  components: {
    TInput,
  },

  data() {
    return {
      name: '',
    };
  },
  mounted() {
    this.name = this.authorDetails.name;
  },
  methods: {
    handleEditAuthor() {
      if ( this.name === this.authorDetails.name ) {
        this.$emit( 'closeEditModal' );
        return;
      }
      this.$emit( 'editAuthor', this.name, this.authorDetails.id );
    },
  },
};

export default EditAuthor;
