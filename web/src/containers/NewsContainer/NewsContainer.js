import { mapState } from 'vuex';

const NewsContainer = {
  name: 'news-list',
  data() {
    return {

    };
  },
  computed: {
    ...mapStateToComputed(),
  }
};

function mapStateToComputed() {
  return mapState( {
    newsFeed: state => state.application.newsFeed,
  } );
}
export default NewsContainer;
