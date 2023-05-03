import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";

// Router
Vue.use(VueRouter);
export const router = new VueRouter();

// ECharts
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

// Filters
import "./filters";

// Calcite Components
import {
  applyPolyfills as applyPolyfillsC,
  defineCustomElements as defineCustomElementsC,
} from "@esri/calcite-components/dist/loader";
// import { setAssetPath } from "@esri/calcite-components/dist/custom-elements";

// allow us to use calcite-components without direct imports
applyPolyfillsC().then(() => {
  defineCustomElementsC(window, {
    resourcesUrl: process.env.PUBLIC_PATH,
  });
});

// tell the browser where to find assets
// setAssetPath(
//   "https://unpkg.com/@esri/calcite-components/dist/calcite/assets"
// );

// tell Vue.js to ignore Calcite Components
Vue.config.ignoredElements = [/calcite-\w*/];
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

