
import Navbar from '../../components/Navbar/Navbar.vue';

const Root = {

  created() {

    console.log('root created');

  },

  components: { Navbar },

  data() {
    return 'a';
  }
  
};


export default Root;
