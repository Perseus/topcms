<template>

  <div class="input-text"  :class="{
      'text-field-error': error
      }">
    <label class="text-label" :id="name">
      <slot name="label"></slot>
    </label>
    <input :type="inputType" :id="name" @input="$emit('input', $event.target.value)" :placeholder="placeholder" class="text-field" />
    <Tooltip :position="{
      bottom: '19px',
      right: '-219px'
    }" v-if="error"> 
      <template slot="tooltip-text">
        {{ error }}
      </template>
    </Tooltip>
  </div>

</template>


<script src="./TextInput.js"></script>
<style src="./TextInput.scss" lang="scss" scoped></style>