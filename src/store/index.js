import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "PENDING",
    screen_size: "m",
    is_side_panel_expanded: true,
    updated_at: undefined,
    views: ["map", "table"],
    featureTypes: ["basins", "reservoirs"],
    states: [],
    metrics: [],
    features: [],
    modals: {
      trends: false,
      forecast: false,
    },
  },
  mutations: {
    config(state, properties) {
      Object.keys(properties).forEach((property) => {
        state[property] = properties[property];
      });
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
    classBreaks(state, { metric, classBreaks }) {
      const m = state.metrics.find((m) => m.code === metric.code);
      m.classBreaks = classBreaks.map((c) => {
        return {
          min: c.minValue,
          max: c.maxValue,
          color: c.symbol.color,
        };
      });
    },
  },
});
