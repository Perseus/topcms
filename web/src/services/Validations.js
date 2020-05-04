import { extend } from 'vee-validate';
import {
  required, min, email, confirmed
} from 'vee-validate/dist/rules';


extend( 'required', required );

extend( 'min', {
  ...min,
  message: ( fieldName, args ) => `${fieldName} needs to be at least ${args.length} characters long`
} );

extend( 'email', {
  ...email,
  message: fieldName => `${fieldName} needs to be a valid e-mail`,
} );

extend( 'confirmed', confirmed );
