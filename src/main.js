import Vue from 'vue'
import App from './App.vue'
import store from "./store";

Vue.config.productionTip = false

// API
import api from "./api";
Vue.prototype.$api = api;

// ECharts 
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

// Calcite Components
import {
  applyPolyfills as applyPolyfillsC,
  defineCustomElements as defineCustomElementsC
} from "@esri/calcite-components/dist/loader";

applyPolyfillsC().then(() => {
  defineCustomElementsC(window, {
    resourcesUrl: '/'
  });
});

Vue.config.ignoredElements = [/esri-\w*/, /calcite-\w*/];

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
