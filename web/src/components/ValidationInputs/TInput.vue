<template>
  <ValidationProvider
    :vid="vId"
    :name="$attrs.name || $attrs.label"
    :rules="rules"
    v-slot="{ errors, valid }"
    :mode="$attrs.mode || 'eager'"
    >
    <b-field
      v-bind="$attrs"
      :type="{ 'is-danger': errors[0], 'is-success': valid }"
      :message="errors">
      <b-input v-model="innerValue" v-bind="$attrs" autocomplete="off" :data-test="$attrs.name"></b-input>
    </b-field>
  </ValidationProvider>
</template>


<script>
import { ValidationProvider } from 'vee-validate';
import { BField } from 'buefy/dist/components/field';
import { BInput } from 'buefy/dist/components/input';


export default {
  components: {
    ValidationProvider,
    'b-field': BField,
    'b-input': BInput
  },
  props: {
    vId: {
      type: String
    },
    rules: {
      type: [Object, String],
      default: '',
    },
    value: {
      type: null,
    }
  },

  data() {
    return {
      innerValue: '',
    }
  },

  watch: {
    innerValue(newVal) {
      this.$emit( 'input', newVal );
    },

    value(newVal) {
      this.innerValue = newVal;
    }
  },

  mounted() {
    this.innerValue = this.value;
  },
}
</script>