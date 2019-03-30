<template>
  <a
    ref="tooltipContainer"
    @click.prevent
    :class="['show-tooltip', actionClass, themeClass]"
    :style="tooltipStyle"
  >
    <slot/>
    <div ref="tooltipContent" :class="[ showTooltipCondition, currentPosition, themeClass, shadowClass]" v-html="text"></div>
  </a>
</template>

<script src="./Tooltip.js"></script>

<style lang="scss" scoped>
.show-tooltip {
  position: relative;
  display: inline-block;
  text-decoration: none;

  &.default-action {
    .content {
      visibility: visible;
      opacity: 1;
      transition-delay: 0s;

      &.bottom {
        transform: translate(-50%, 0.5em);
      }

      &.left {
        transform: translate(-0.5em, -50%);
      }

      &.top {
        transform: translate(-50%, -0.5em);
      }

      &.right {
        transform: translate(0.5em, -50%);
      }

      &.bottom-left {
        transform: translate(-90%, 0.5em);
      }

      &.bottom-right {
        transform: translate(90%, 0.5em);
      }

      &.top-right {
        transform: translate(90%, -0.5em);
      }

      &.top-left {
        transform: translate(-90%, -0.5em);
      }
    }
  }

  &.hover {
    &:hover {
      .content {
        visibility: visible;
        opacity: 1;
        transition-delay: 0s;

        &.bottom {
          transform: translate(-50%, 0.5em);
        }
        &.left {
          transform: translate(-0.5em, -50%);
        }
        &.top {
          transform: translate(-50%, -0.5em);
        }
        &.right {
          transform: translate(0.5em, -50%);
        }

        &.bottom-left {
          transform: translate(-90%, 0.5em);
        }
      }
    }
  }

  &.focus {
    &:focus {
      visibility: visible;
      opacity: 1;
      transition-delay: 0s;

      &.bottom {
        transform: translate(-50%, 0.5em);
      }
      &.left {
        transform: translate(-0.5em, -50%);
      }
      &.top {
        transform: translate(-50%, -0.5em);
      }
      &.right {
        transform: translate(0.5em, -50%);
      }
      &.bottom-left {
        transform: translate(-90%, 0.5em);
      }
    }
  }
}

.content {
  position: absolute;
  text-align: center;
  padding: 4px 2px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  padding: 12px;
  z-index: 1;
  min-width: 210px;
  max-width: 240px;
  visibility: hidden;
  opacity: 0;
  transition-delay: 0.5s;

  &.apply-shadow {
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 10px;
  }

  &.error {
    background: $color-red-6;
    color: #ffffff;

    &.left::before {
      border-left-color: $color-red-6;
    }
    &.right::before {
      border-right-color: $color-red-6;
    }
    &.top::before,
    &.top-right::before,
    &.top-left::before {
      border-top-color: $color-red-6;
    }
    &.bottom::before,
    &.bottom-right::before,
    &.bottom-left::before {
      border-bottom-color: $color-red-6;
    }
  }

  &.default {
    background: #ffffff;
    color: #3e173b;

    &.left::before {
      border-left-color: #ffffff;
    }
    &.right::before {
      border-right-color: #ffffff;
    }
    &.top::before,
    &.top-right::before,
    &.top-left::before {
      border-top-color: #ffffff;
    }
    &.bottom::before,
    &.bottom-right::before,
    &.bottom-left::before {
      border-bottom-color: #ffffff;
    }
  }

  &::before {
    content: "";
    position: absolute;
    border: 12px solid transparent;
    z-index: 99;
  }

  &.left {
    top: 50%;
    right: calc(100% + 8px);
    transform: translate(-0.8em, -50%);

    &::before {
      top: 50%;
      right: calc(0em - 16px);
      border-right-width: 0;
      transform: translate(-0.5em, -50%);
    }
  }

  &.right {
    top: 50%;
    left: calc(100% + 8px);
    transform: translate(0.8em, -50%);

    &::before {
      top: 50%;
      left: calc(0em - 16px);
      border-left-width: 0;
      transform: translate(0.5em, -50%);
    }
  }

  &.top {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translate(-50%, -0.8em);

    &::before {
      bottom: calc(0em - 16px);
      left: 50%;
      border-bottom-width: 0;
      transform: translate(-50%, -0.5em);
    }
  }

  &.bottom {
    top: calc(100% + 8px);
    left: 50%;
    transform: translate(-50%, 0.8em);

    &::before {
      top: calc(0em - 16px);
      left: 50%;
      border-top-width: 0;
      transform: translate(-50%, 0.5em);
    }
  }

  &.top-right {
    bottom: calc(100% + 8px);
    right: 50%;
    transform: translate(90%, -0.8em);

    &::before {
      bottom: calc(0em - 16px);
      right: 90%;
      border-bottom-width: 0;
      transform: translate(50%, -0.5em);
    }
  }

  &.top-left {
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translate(-90%, -0.8em);

    &::before {
      bottom: calc(0em - 16px);
      left: 90%;
      border-bottom-width: 0;
      transform: translate(-50%, -0.5em);
    }
  }

  &.bottom-left {
    top: calc(100% + 8px);
    left: 50%;
    transform: translate(-90%, 0.8em);

    &::before {
      top: calc(0em - 16px);
      left: 90%;
      border-top-width: 0;
      transform: translate(-50%, 0.5em);
    }
  }

  &.bottom-right {
    top: calc(100% + 8px);
    right: 50%;
    transform: translate(90%, 0.8em);

    &::before {
      top: calc(0em - 16px);
      right: 90%;
      border-top-width: 0;
      transform: translate(50%, 0.5em);
    }
  }
}

@supports (filter: drop-shadow(rgba(0, 0, 0, 0.16) 0 2px 6px)) {
  .content {
    /*
          Apply drop-shadow if its available
        */
    &.apply-shadow {
      box-shadow: none;
      filter: drop-shadow(rgba(0, 0, 0, 0.16) 0 2px 6px);
    }
  }
}

@keyframes tooltip-horizontal {
  to {
    transform: translate(0, -50%);
  }
}

@keyframes tooltip-vertical {
  to {
    transform: translate(-50%, 0);
  }
}
</style>
