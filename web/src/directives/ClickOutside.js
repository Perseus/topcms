import _ from 'lodash';

export default {
  install( Vue, options ) {
    Vue.directive( 'click-outside', {
      bind( el, binding, vNode ) {
        if ( typeof binding.value !== 'function' ) {
          const componentName = vNode.context.name;
          let error = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`;
          if ( componentName ) {
            error += `Found in component '${componentName}'`;
          }
          console.error( error );
        }

        const bubble = binding.modifiers.bubble;
        const handler = ( event ) => {
          if ( bubble || ( !el.contains( event.target ) && el !== event.target ) ) {
            binding.value( event );
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener( 'click', handler );
      },
      unbind( el ) {
        document.removeEventListener( 'click', el.__vueClickOutside__ );
        el.__vueClickOutside__ = null;
      }
    } );
  }
};
