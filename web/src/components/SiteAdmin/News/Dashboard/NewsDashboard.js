import { getDateInWordsToNow } from '@utils/DateUtils';
import clip from 'text-clipper';
import { BButton } from 'buefy/dist/components/button';
import { BTable } from 'buefy/dist/components/table';

const NewsDashboard = {
  name: 'admin-news-dashboard',
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    news: {
      type: Array,
      default: () => []
    }
  },

  components: {
    'b-button': BButton,
    'b-table': BTable
  },

  methods: {
    moveToCreateNewsPage() {
      this.$emit( 'moveToCreateNewsPage' );
    },
    getDateInWords( date ) {
      return getDateInWordsToNow( date );
    },
    deleteArticle( articleId ) {
      this.$emit( 'deleteNewsArticle', articleId );
    },
    editNewsArticle( articleId ) {
      this.$emit( 'editNewsArticle', articleId );
    },
    getClippedHTML( html ) {
      return clip( html, 15 );
    },
    deleteNewsPrompt( articleId ) {
      if ( !articleId ) {
        return;
      }
      this.$buefy.dialog.confirm( {
        title: 'Deleting News Article',
        message: 'Are you sure you want to <b>delete</b> this news article? This action cannot be undone.',
        confirmText: 'Delete News Article',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteArticle( articleId );
        }
      } );
    }
  }

};

export default NewsDashboard;
