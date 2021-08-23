import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "PENDING",
    views: [
      {
        name: "Precipitation",
        code: "PREC",
        map_id: "a4a6936dfe5248ddbd8a49786661d45b"
      },
      {
        name: "Basin Avg. Temperatures",
        code: "TAVG",
        map_id: "b15989ab8224480b96eac8121e18ef17"
      },
      // {
      //   name: "Reservoir Storage Capacity",
      //   map_id: "8834786dcc384d0d8a2ea0bde97e98d2"
      // },
      {
        name: "Snow Water Equivalent",
        code: "WTEQ",
        map_id: "ed044dba86d84f408b23debedcd927b2"
      },
      // { name: "Stream Flow Rate", map_id: "9fa38c39a2ed4cf9bbd717924fc223d5" }
    ],
    view: null,
    scope: "UT",
    features: [],
    chart: null
  },
  getters: {},
  mutations: {
    status(state, status) {
      state.status = status;
    },
    features(state, features) {
      state.features = features;
    },
    view(state, view) {
      state.view = view;
    },
    chart(state, { basin }) {
      state.chart = `https://www.nrcs.usda.gov/Internet/WCIS/AWS_PLOTS/basinCharts/POR/${state.view.code}/stdHUCut_8/${basin}.html`;
    },
    clearChart(state) {
      state.chart = null;
    }
  }
});
