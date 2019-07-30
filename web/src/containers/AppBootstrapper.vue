<template>
  <div class="app-bootstrapper">
    <div v-if="isAppBootstrapping" class="app-loader">
      <svg
        class="loading-wave"
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="11" cy="50" fill="#1d3f72" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="18" cy="60" fill="#5699d2" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.08333333333333333s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="25" cy="67.32050807568876" fill="#d8ebf9" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.16666666666666666s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="32" cy="70" fill="#71c2cc" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.25s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="39" cy="67.32050807568878" fill="#1d3f72" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.3333333333333333s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="46" cy="60" fill="#5699d2" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.4166666666666667s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="53" cy="50" fill="#d8ebf9" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.5s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="60" cy="40.00000000000001" fill="#71c2cc" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.5833333333333334s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="67" cy="32.67949192431123" fill="#1d3f72" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.6666666666666666s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="74" cy="30" fill="#5699d2" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.75s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="81" cy="32.67949192431123" fill="#d8ebf9" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.8333333333333334s"
            repeatCount="indefinite"
          ></animate>
        </circle>
        <circle cx="88" cy="39.99999999999999" fill="#71c2cc" r="3">
          <animate
            attributeName="cy"
            values="30;70;30"
            times="0;0.5;1"
            dur="1s"
            calcMode="spline"
            keySplines="0.5 0 0.5 1;0.5 0 0.5 1"
            begin="-0.9166666666666666s"
            repeatCount="indefinite"
          ></animate>
        </circle>
      </svg>
    </div>
    <router-view v-else></router-view>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import ActionTypes from "../store/types/ActionTypes";
import App from "./App/App.vue";

const AppBootstrapper = {
  components: {
    "t-app": App
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
