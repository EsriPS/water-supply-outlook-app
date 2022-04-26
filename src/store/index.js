import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Loading status of the app
    status: "PENDING",

    // Screen size (xs, s, or m)
    screen_size: "m",

    // Is the side panel open
    is_side_panel_expanded: true,

    // Date the features were last updated
    updated_at: undefined,

    // View options
    views: ["map", "table"],

    // State options
    states: [],

    // Metric options
    metrics: [],

    // Feature options
    features: [],

    // Open stat of the modals
    modals: {
      trends: false,
      forecast: false,
    },
  },
  mutations: {
    // Add all items from the config file
    // to app state
    config(state, properties) {
      Object.keys(properties).forEach((property) => {
        state[property] = properties[property];
      });
    },

    // Update loading status of the app
    status(state, status) {
      state.status = status;
    },

    // Update size based on window screen size
    screenSize(state, size) {
      state.screen_size = size;
    },

    // Update basins
    features(state, features) {
      state.features = features;
    },

    // Open or close modal
    toggleModal(state, ref) {
      state.modals[ref] = !state.modals[ref];
    },

    // Open or close the side panel
    toggleSidePanel(state) {
      state.is_side_panel_expanded = !state.is_side_panel_expanded;
    },

    // Update the updated_at date
    updatedAt(state, date) {
      state.updated_at = date;
    },

    // Update class breaks from map layer
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

