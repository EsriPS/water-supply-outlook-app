import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

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
import { setAssetPath } from "@esri/calcite-components/dist/custom-elements";

applyPolyfillsC().then(() => {
  defineCustomElementsC(window, {
    resourcesUrl: "/",
  });
});

setAssetPath(
  "https://unpkg.com/@esri/calcite-components/dist/calcite/assets"
);

Vue.config.ignoredElements = [/esri-\w*/, /calcite-\w*/];

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

