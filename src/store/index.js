import Vue from "vue";
import Vuex from "vuex";
import { router } from "../main.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "PENDING",
    screen_size: "m",
    is_side_panel_expanded: true,
    updated_at: null,
    view: null,
    views: [ "map", "table"],
    states: [],
    state: null,
    metrics: [],
    metric: null,
    features: [],
    feature: null,
    modals: {
      trends: false,
      forecast: false,
    },
  },
  getters: {
    view(state) {
      return state.view || router.currentRoute.query.view;
    },
    state(state) {
      return (
        state.state ||
        state.states.find((s) => s.code == router.currentRoute.query.state)
      );
    },
    metric(state) {
      return (
        state.metric ||
        state.metrics.find((v) => v.code == router.currentRoute.query.metric)
      );
    },
    feature(state) {
      return (
        state.feature ||
        state.features.find(
          (f) => f.attributes.FID == router.currentRoute.query.feature
        )
      );
    },
    features(state, getters) {
      // Return features specific to the scoped state
      return [...state.features].filter(
        (feature) => feature.attributes.btype === getters.state.basin_huc_code
      );
    },
    trendsSrc(state, getters) {
      return `${state.trends_base_url}${getters.metric.code}/stdHUC${
        getters.state[getters.feature ? "basin_huc_code" : "state_huc_code"]
      }/${
        getters.feature
          ? getters.feature.attributes.name
              .split(" ")
              .join("_")
              .toLowerCase()
          : `state_of_${getters.state.name.toLowerCase()}`
      }.html
      `;
    },
    forecastSrc(state, getters) {
      return `${state.forecast_base_url}#state=${getters.state.code}&basin=${getters.feature.attributes.name}&year=2021&pubDate=1-1&period=all&chartWidth=800&normalType=AVG&labelUnit=VOL&forecastLabels=ALL&showForecast=true&showForecastLabel=false&showObserved=false&showObservedLabel=false&showNormal=false&showNormalLabel=false&showMax=false&showMaxLabel=false&showMaxYear=false&showMin=false&showMinLabel=false&showMinYear=false&showNumberObservations=false&hideEmpty=true`;
    },
  },
  mutations: {
    config(state, properties) {
      Object.keys(properties).forEach((property) => {
        state[property] = properties[property];
      });
    },
    view(state, view) {
      state.view = view;
      router.push({
        query: {
          ...router.currentRoute.query,
          view,
        },
      });
    },
    state(state, s) {
      state.state = s;
      state.feature = null;
      router.push({
        query: {
          ...router.currentRoute.query,
          state: s.code,
          feature: null,
        },
      });
    },
    metric(state, metric) {
      state.metric = metric;
      router.push({
        query: {
          ...router.currentRoute.query,
          metric: metric.code,
        },
      });
    },
    async feature(state, feature) {
      state.feature = feature;
      await router.push({
        query: {
          ...router.currentRoute.query,
          feature: feature?.attributes?.FID,
        },
      });
      return;
    },
    status(state, status) {
      state.status = status;
    },
    screenSize(state, size) {
      state.screen_size = size;
    },
    features(state, features) {
      state.features = features;
    },
    toggleModal(state, ref) {
      state.modals[ref] = !state.modals[ref];
    },
    toggleSidePanel(state) {
      state.is_side_panel_expanded = !state.is_side_panel_expanded;
    },
    updatedAt(state, date) {
      state.updated_at = date;
    },
  },
});
