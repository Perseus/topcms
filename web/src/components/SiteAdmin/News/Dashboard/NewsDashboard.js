import { distanceInWordsToNow } from 'date-fns';
import clip from 'text-clipper';

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


  methods: {
    moveToCreateNewsPage() {
      this.$emit( 'moveToCreateNewsPage' );
    },
    getDateInWords( date ) {
      // TODO: figure out why I need to mutiply the date by 1, probably a typecasting issue
      return distanceInWordsToNow( date * 1 );
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
      this.$dialog.confirm( {
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
