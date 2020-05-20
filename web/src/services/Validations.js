import { extend } from 'vee-validate';
import {
  required, min, email, confirmed, required_if, numeric, integer
} from 'vee-validate/dist/rules';


extend( 'required', {
  ...required,

  message: fieldName => `${fieldName} is required`
} );

extend( 'min', {
  ...min,
  message: ( fieldName, args ) => `${fieldName} needs to be at least ${args.length} characters long`
} );

extend( 'email', {
  ...email,
  message: fieldName => `${fieldName} needs to be a valid e-mail`,
} );

extend( 'confirmed', {
  ...confirmed,
  message: ( fieldName, args ) => `This field's value needs to match the value in ${args.target}`
} );

extend( 'required_if', required_if );

extend( 'numeric', {
  ...numeric,
  message: fieldName => `${fieldName} needs to be a valid number`
} );

extend( 'integer', {
  ...integer,
  message: fieldName => `${fieldName} needs to be a valid number`
} );

extend( 'is_url', {
  validate: ( value ) => {
    let url;
    try {
      url = new URL( value );
    } catch ( _ ) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  },
  message: fieldName => `${fieldName} needs to be a valid URL`
} );
