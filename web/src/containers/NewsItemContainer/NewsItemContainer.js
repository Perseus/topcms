import { mapState } from 'vuex';
import _ from 'lodash';

const NewsItemContainer = {
  name: 'news-item-container',
  data() {
    return {
      currentNewsItemID: this.$route.params.id,
    };
  },

  computed: {
    ...mapStateToComputed(),
    doesNewsItemExist() {
      return _.find( this.news, { id: this.currentNewsItemID } );
    }
  }
};


function mapStateToComputed() {
  return mapState( {
    news: state => state.site.news
  } );
}

export default NewsItemContainer;
