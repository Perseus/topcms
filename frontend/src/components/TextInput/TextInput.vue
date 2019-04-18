<template>

  <div class="input-text"  :class="{
      'text-field-error': error
      }">
    <label class="text-label" :id="name">
      <slot name="label"></slot>
    </label>
    
    <Tooltip :text="error" :isVisible="shouldShowErrorTooltip" :position="'right'" :theme="'error'"> 
      <input :type="inputType" :id="name" @input="$emit('input', $event.target.value)" :placeholder="placeholder" class="text-field" required/>
    </Tooltip>
  </div>

</template>


<script src="./TextInput.js"></script>
<style src="./TextInput.scss" lang="scss" scoped></style>