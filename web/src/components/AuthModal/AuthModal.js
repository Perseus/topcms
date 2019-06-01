const AuthModal = {
  

  data() {
    return {
      username: '',
      password: '',
    }
  },

  methods: {

    signupProcess() {
      console.log('asd');
    },

    closeModal() {
      this.$emit('onCloseAuthModal');
    }

  }
};


export default AuthModal;
