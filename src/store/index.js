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
  },
  getters: {
    state(state) {
      // const code = router.currentRoute.query.state || state.states[0].code;
      return (
        state.state ||
        state.states.find((s) => s.code == router.currentRoute.query.state)
      );
    },
    view(state) {
      return (
        state.view ||
        state.views.find((v) => v.code == router.currentRoute.query.view)
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
    trendsSrc(state, getters) {
      console.log(state);
      return `${state.trends_base_url}${getters.view.code}/std${
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
    view(state, view) {
      state.view = view;
      router.push({
        query: {
          ...router.currentRoute.query,
          view: view.code,
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
