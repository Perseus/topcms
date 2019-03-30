
import _ from 'lodash';

export default {
  name: 'tooltip',
  props: {
    showOnFocus: {
      type: Boolean,
      default: false
    },
    showOnHover: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    showTool: {
      type: Boolean,
      default: true
    },
    tooltipStyle: {
      type: Object,
      default: () => ( {} )
    },
    position: {
      type: String,
      default: 'bottom',
      validator: ( value ) => _.indexOf( [ 'top', 'right', 'bottom', 'left', 'top-right', 'top-left', 'bottom-right', 'bottom-left' ], value ) !== -1
    },
    fallbackPosition: {
      type: String,
      default: '',
      validator: ( value ) => _.indexOf( [ '', 'top', 'right', 'bottom', 'left', 'top-right', 'top-left', 'bottom-right', 'bottom-left' ], value ) !== -1
    },
    theme: {
      type: String,
      default: 'default',
      validator: ( value ) => _.indexOf( [ 'error', 'warning', 'success', 'default' ], value ) !== -1
    },
    applyShadow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showManually: false,
      currentPosition: ''
    };
  },
  computed: {
    actionClass() {
      if ( this.isVisible ) {
        return 'default-action';
      }

      if ( this.showOnFocus ) {
        return 'focus';
      }

      if ( this.showOnHover ) {
        return 'hover';
      }

      return '';
    },
    themeClass() {
      return this.theme;
    },
    shadowClass() {
      if ( this.applyShadow ) {
        return 'apply-shadow';
      }

      return '';
    },
    showTooltipCondition() {
      return ( this.isVisible ? 'content': '' );
    },
  },
  mounted() {
    this.currentPosition = this.position;
    setTimeout( () => {
      this.onTooltipTransitionEnd();
    }, 200 );
    this.$refs.tooltipContainer.addEventListener( 'transitionend', this.onTooltipTransitionEnd );
  },
  methods: {
    onTooltipTransitionEnd() {
      switch ( this.currentPosition ) {
        case 'top': {
          this.setFallbackPosition( this.calculateIfNoSpaceFromTop() );
          break;
        }
        case 'right': {
          this.setFallbackPosition( this.calculateIfNoSpaceFromRight() );
          break;
        }
        case 'bottom': {
          this.setFallbackPosition( this.calculateIfNoSpaceFromBottom() );
          break;
        }
        case 'left': {
          this.setFallbackPosition( this.calculateIfNoSpaceFromLeft() );
          break;
        }
        case 'top-right': {
          this.setFallbackPosition( this.calculateIfNoSpaceFromTop() || this.calculateIfNoSpaceFromRight() );
          break;
        }
        case 'top-left': {
          this.setFallbackPosition( this.calculateIfNoSpaceFromTop() || this.calculateIfNoSpaceFromLeft() );
          break;
        }
        case 'bottom-right': {
          this.setFallbackPosition( this.calculateIfNoSpaceFromBottom() || this.calculateIfNoSpaceFromRight() );
          break;
        }
        case 'bottom-left': {
          this.setFallbackPosition( this.calculateIfNoSpaceFromBottom() || this.calculateIfNoSpaceFromLeft() );
          break;
        }
      }
    },
    calculateIfNoSpaceFromTop() {
      const distanceFromTop = this.$refs.tooltipContainer.getBoundingClientRect().top;
      const tooltipContentHeight = this.$refs.tooltipContent.offsetHeight;

      if ( distanceFromTop < tooltipContentHeight ) {
        return true;
      }

      return false;
    },
    calculateIfNoSpaceFromRight() {
      const distanceToRightHTMLElement = document.documentElement.getBoundingClientRect().right;
      const distanceToRight = this.$refs.tooltipContainer.getBoundingClientRect().right;
      const distanceFromRight = distanceToRightHTMLElement - distanceToRight;
      const tooltipContentWidth = this.$refs.tooltipContent.offsetWidth;

      if ( distanceFromRight < tooltipContentWidth ) {
        return true;
      }

      return false;
    },
    calculateIfNoSpaceFromBottom() {
      const distanceToBottomHTMLElement = document.documentElement.getBoundingClientRect().bottom;
      const distanceToBottom = this.$refs.tooltipContainer.getBoundingClientRect().bottom;
      const distanceFromBottom = distanceToBottomHTMLElement - distanceToBottom;
      const tooltipContentHeight = this.$refs.tooltipContent.offsetHeight;

      if ( distanceFromBottom < tooltipContentHeight ) {
        return true;
      }

      return false;
    },
    calculateIfNoSpaceFromLeft() {
      const distanceFromLeft = this.$refs.tooltipContainer.getBoundingClientRect().left;
      const tooltipContentWidth = this.$refs.tooltipContent.offsetWidth;

      if ( distanceFromLeft < tooltipContentWidth ) {
        return true;
      }

      return false;
    },
    setFallbackPosition( shouldSet = false ) {
      if ( shouldSet && _.isString( this.fallbackPosition ) && this.fallbackPosition !== '' ) {
        this.currentPosition = this.fallbackPosition;
      }

      this.$refs.tooltipContainer.removeEventListener( 'transitionend', this.onTooltipTransitionEnd );
    },
  },

  watch: {
    isVisible( newVal, oldVal ) {
      console.log(` newVal: ${newVal}, oldVal: ${oldVal} `);
    }
  }

};
