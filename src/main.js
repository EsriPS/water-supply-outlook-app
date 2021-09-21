import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

// API
import api from "./api";
Vue.prototype.$api = api;

// Router
Vue.use(VueRouter);
export const router = new VueRouter();
// Vue.prototype.$router = router;

// ECharts
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

// Calcite Components
import {
  applyPolyfills as applyPolyfillsC,
  defineCustomElements as defineCustomElementsC,
} from "@esri/calcite-components/dist/loader";

applyPolyfillsC().then(() => {
  defineCustomElementsC(window, {
    resourcesUrl: "/",
  });
});

Vue.config.ignoredElements = [/esri-\w*/, /calcite-\w*/];

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
