import Joi from '@hapi/joi';
import _ from 'lodash';

interface ExtendedStringSchema extends Joi.StringSchema {
  isIn( stringList: string[] ): this;
}

interface StringIsInRuleArgs {
  stringList: string[];
}

interface ExtendedJoi extends Joi.Root {
  string(): ExtendedStringSchema;
}

// did all this before I saw Joi has a .valid() method, leaving it here as an example of extending joi rules
const custom: ExtendedJoi = Joi.extend( joi => ( {
  type: 'string',
  base: joi.string(),
  messages: {
    'string.isIn': `{{#value}} should be one of {{#stringList}}`
  },
  rules: {
    isIn: {
      method( stringList ): Joi.RuleMethod {
        return this.$_addRule( { name: 'isIn', args: { stringList } } );
      },

      args: [ 'stringList' ],
      validate( value: string, helpers: Joi.CustomHelpers, args: StringIsInRuleArgs ): string | Joi.ErrorReport {
        if ( args.stringList.includes( value ) ) {
          return value;
        }

        return helpers.error( 'string.isIn', { value, stringList: JSON.stringify( args.stringList ) } );
      }
    }
  }
} ) );

export default custom;
