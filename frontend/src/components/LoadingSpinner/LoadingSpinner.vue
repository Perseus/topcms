<template>
  <div class="loading-circle" :style="circleStyle"></div>
</template>

<script>
const LoadingSpinner = {
  props: {
    primaryColor: {
      type: String,
      default: "#4098D7"
    },
    secondaryColor: {
      type: String,
      default: "#FFFFFF"
    },
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: Number,
      default: 20
    },
    borderSize: {
      type: Number,
      default: 2
    }
  },

  computed: {
    circleStyle() {
      return {
        height: `${this.height}px`,
        width: `${this.width}px`,
        border: `${this.borderSize}px solid ${this.secondaryColor}`,
        "border-bottom": `${this.borderSize}px solid ${this.primaryColor}`
      };
    }
  }
};

export default LoadingSpinner;
</script>


<style lang="scss" scoped>
.loading-circle {
  width: 20px;
  height: 20px;
  border: 2px solid $color-white;
  border-bottom: 2px solid $color-primary-6;
  border-radius: 50%;
  backface-visibility: none;
  animation: circle-spin 0.5s infinite linear;
}

@keyframes circle-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
