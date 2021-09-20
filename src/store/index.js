import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "PENDING",
    screen_size: "m",
    is_side_panel_expanded: true,
    updated_at: null,
    states: [],
    state: null,
    views: [],
    view: null,
    features: [],
    feature: null,
    modals: {
      trends: false,
      forecast: false,
    },
    trends_base_url:
      "https://www.nrcs.usda.gov/Internet/WCIS/AWS_PLOTS/basinCharts/POR/",
    forecast_base_url:
      "https://www.nrcs.usda.gov/wps/portal/wcc/home/quicklinks/forecastCharts/",
  },
  getters: {
    trendsSrc(state) {
      return `${state.trends_base_url}${state.view.code}/std${
        state.state[state.feature ? "basin_huc_code" : "state_huc_code"]
      }/${
        state.feature
          ? state.feature.attributes.name
              .split(" ")
              .join("_")
              .toLowerCase()
          : `state_of_${state.state.name.toLowerCase()}`
      }.html
      `;
    },
    forecastSrc(state) {
      return `${state.forecast_base_url}#state=${state.state.code}&basin=${state.feature.attributes.name}&year=2021&pubDate=1-1&period=all&chartWidth=800&normalType=AVG&labelUnit=VOL&forecastLabels=ALL&showForecast=true&showForecastLabel=false&showObserved=false&showObservedLabel=false&showNormal=false&showNormalLabel=false&showMax=false&showMaxLabel=false&showMaxYear=false&showMin=false&showMinLabel=false&showMinYear=false&showNumberObservations=false&hideEmpty=true`;
    },
  },
  mutations: {
    config(state, properties) {
      Object.keys(properties).forEach((property) => {
        state[property] = properties[property];
      });
    },
    state(state, s) {
      state.state = s;
      state.feature = null;
    },
    status(state, status) {
      state.status = status;
    },
    screenSize(state, size) {
      state.screen_size = size;
    },
    view(state, view) {
      state.view = view;
    },
    features(state, features) {
      state.features = features;
    },
    feature(state, feature) {
      state.feature = feature;
    },
    toggleModal(state, ref) {
      state.modals[ref] = !state.modals[ref];
    },
    toggleSidePanel(state) {
      state.is_side_panel_expanded = !state.is_side_panel_expanded;
    },
    updatedAt(state, date) {
      state.updated_at = date
    }
    // `https://www.nrcs.usda.gov/Internet/WCIS/AWS_PLOTS/basinCharts/POR/${state.view.code}/std${state}/${basin}.html`;
  },
});
