export default {
  computed: {
    // Is the app embedded within another site.
    // Expressed through url parameters
    embedded() {
      return this.$route.query.embedded;
    },

    // The current view of the app: table or map
    view() {
      return this.$route.query.view;
    },

    // The selected state
    state() {
      return this.$store.state.states.find(
        (s) => s.code == this.$route.query.state
      );
    },

    // The selected metric. Controls the map that
    // is rendered and the filter expressed on the table
    metric() {
      return this.$store.state.metrics.find(
        (v) => v.code == this.$route.query.metric
      );
    },

    // The selected feature (basin) if one is selected.
    feature() {
      if (!this.$route.query.feature) return false;
      return this.$store.state.features.find(
        (f) => f.attributes.FID == this.$route.query.feature
      );
    },

    // All metric options
    metrics() {
      return this.$store.state.metrics;
    },

    // All of basins within the current state
    features() {
      return [...this.$store.state.features].filter(
        (feature) => feature.attributes.btype === this.state.basin_huc_code
      );
    },

    // The type of the rendered features (basin or res.)
    featureType() {
      return this.$route.query.featureType;
    },

    // Sorted list of features (sorted alphabetically)
    featuresOptions() {
      return [...this.features].sort((a, b) =>
        a.attributes.name.localeCompare(b.attributes.name)
      );
    },

    // URL of the precipitation forecast chart
    forecastSrc() {
      return `${this.$store.state.forecast_base_url}/#state=${
        this.state.code
      }&basin=${this.feature.attributes.name.toUpperCase()}&year=${new Date().getFullYear()}&pubDate=1-1&period=all&chartWidth=800`;
    },

    // The URL of the trends chart for the selected
    // basin and metric. The state of nevada differs
    // in the name of its forecast chart
    trendsSrc() {
      let scope = `state_of_${
        this.state.code === "NV"
          ? "nevada_and_eastern_sierra"
          : this.state.name.toLowerCase()
      }`;
      if (this.feature) {
        scope = this.feature.attributes.name
          .split(" ")
          .join("_")
          .toLowerCase();
      }
      const hucCode = this.state[
        this.feature ? "basin_huc_code" : "state_huc_code"
      ];
      return `${this.$store.state.trends_base_url}/${this.metric.code}/stdHUC${hucCode}/${scope}.html`;
    },
  },
  methods: {
    // Updates the url parameters
    push(query) {
      this.$router.push({
        query: {
          ...this.$route.query,
          ...query,
        },
      });
    },

    // Update the 'view' URL parameter
    updateView(view) {
      this.push({
        view,
      });
      if (this.$store.state.screen_size === "xs") {
        this.$store.commit("toggleSidePanel");
      }
    },

    // Update the 'state' URL parameter
    updateState(state) {
      this.push({
        state: state.code,
        feature: undefined, // clear basin or reservoir
      });
    },

    // Update the 'metric' URL parameter
    updateMetric(metric) {
      this.push({
        metric: metric.code,
      });
    },

    // Update the 'feature' URL parameter
    updateFeature(feature) {
      this.push({
        feature: feature.attributes.FID,
        featureType: "stations",
      });
    },

    // Update the 'featureType' URL parameter
    updateFeatureType(featureType = "basins") {
      this.push({
        featureType,
      });
    },

    // Update the 'feature' URL parameter to null
    clearFeature() {
      this.push({
        feature: undefined,
      });
    },
  },
};

