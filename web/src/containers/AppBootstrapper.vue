<template>
  <div :class="['app-bootstrapper', { 'loading': isAppBootstrapping } ]">
    <div v-if="isAppBootstrapping" class="app-loader">
      <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
        <g fill="none" fill-rule="evenodd" stroke-width="2">
            <circle cx="22" cy="22" r="1" stroke="#F7AD3B">
                <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
            </circle>
            <circle cx="22" cy="22" r="1" stroke="#F7AD3B">
                <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
            </circle>
        </g>
      </svg>
    </div>
    <router-view v-else></router-view>
    <t-toasts-container></t-toasts-container>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import ToastsContainer from '@containers/ToastContainer/ToastContainer.vue';

import ActionTypes from "../store/types/ActionTypes";
import App from "./App/App.vue";

const AppBootstrapper = {
  components: {
    "t-app": App,
    't-toasts-container': ToastsContainer,
  },
  computed: {
    ...getStateGetters()
  }
};

function getStateGetters() {
  return mapGetters({
    isAppBootstrapping: "isAppBootstrapping"
  });
}

export default AppBootstrapper;
</script>

<style lang="scss" scoped>

.app-bootstrapper {
  height: 100%;
  width: 100%;
  position: relative;

  &.loading {
    height: 100vh;
  }
}

.app-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading-wave {
  height: 140px;
}
</style>
