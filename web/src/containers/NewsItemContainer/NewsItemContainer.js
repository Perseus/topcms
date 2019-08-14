import { mapState } from 'vuex';
import _ from 'lodash';

import { getDateInWordsToNow } from '../../utils/DateUtils';

const NewsItemContainer = {
  name: 'news-item-container',
  data() {
    return {
      currentNewsItemID: this.$route.params.id,
    };
  },

  computed: {
    ...mapStateToComputed(),
    currentNewsItem() {
      return _.find( this.news, { id: Number( this.currentNewsItemID ) } );
    },
    newsCreatedAt() {
      return ( getDateInWordsToNow( this.currentNewsItem.createdAt ) );
    }
  }
};


function mapStateToComputed() {
  return mapState( {
    news: state => state.site.news
  } );
}

export default NewsItemContainer;
