<template>

  <div class="form-error">
    <font-awesome-icon icon="exclamation-circle" class="exclamation-icon"></font-awesome-icon>
    <div class="error-text">
      <slot />
    </div>
    
  </div>

</template>


<script>

const FormError = {

};

export default FormError;

</script>

<style lang="scss" scoped>

  .form-error {
    width: 32rem;
    display: flex;
    height: 5rem;
    background-color: rgba($color-red-6, 0.8);
    border-radius: 4px;
    font-size: 1.5rem;
    color: $color-white;
    margin-bottom: 1.9rem;
    align-items: center;
    justify-content: flex-start;

    .exclamation-icon {
      margin-left: 2rem;
    }

    .error-text {
      margin-left: 2rem;
      margin-right: auto;
      text-align: left;
    }
  }

</style>