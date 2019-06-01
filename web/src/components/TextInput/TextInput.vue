<template>

  <div :class="['input-text', { 'text-field-error': error }, layout]">
    <label class="text-label" :id="name">
      <slot name="label"></slot>
    </label>
    
    <Tooltip :text="error" :isVisible="shouldShowErrorTooltip" :position="'right'" :theme="'error'"> 
      <input :type="inputType" :id="name" @input="$emit('input', $event.target.value)" :placeholder="placeholder" class="text-field" :value="value" required :disabled="disabled"/>
    </Tooltip>
  </div>

</template>


<script src="./TextInput.js"></script>
<style src="./TextInput.scss" lang="scss" scoped></style>