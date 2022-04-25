export default {
  computed: {
    embedded() {
      return this.$route.query.embedded;
    },
    view() {
      return this.$route.query.view;
    },
    state() {
      return this.$store.state.states.find(
        (s) => s.code == this.$route.query.state
      );
    },
    metric() {
      return this.$store.state.metrics.find(
        (v) => v.code == this.$route.query.metric
      );
    },
    feature() {
      return this.$store.state.features.find(
        (f) => f.attributes.FID == this.$route.query.feature
      );
    },
    metrics() {
      return this.$store.state.metrics;
    },
    features() {
      // Return features specific to the scoped state
      return [...this.$store.state.features].filter(
        (feature) => feature.attributes.btype === this.state.basin_huc_code
      );
    },
    featureType() {
      return this.$route.query.featureType;
    },
    featuresOptions() {
      return [...this.features].sort((a, b) =>
        a.attributes.name.localeCompare(b.attributes.name)
      );
    },
    forecastSrc() {
      return `${this.$store.state.forecast_base_url}/#state=${
        this.state.code
      }&basin=${this.feature.attributes.name.toUpperCase()}&year=${new Date().getFullYear()}&pubDate=1-1&period=all&chartWidth=800`;
    },
    trendsSrc() {
      // Set scope of trend chart url ({scope}.html). The state
      // of nevada is different than all other states.
      let scope = `state_of_${
        this.state.code === "NV"
          ? "nevada_and_eastern_sierra"
          : this.state.name.toLowerCase()
      }`;

      // Update scope if focussed on a feature
      if (this.feature) {
        scope = this.feature.attributes.name
          .split(" ")
          .join("_")
          .toLowerCase();
      }

      const hucCode = this.state[
        this.feature ? "basin_huc_code" : "state_huc_code"
      ];

      // Trends Chart URL
      return `${this.$store.state.trends_base_url}/${this.metric.code}/stdHUC${hucCode}/${scope}.html`;
    },
  },
  methods: {
    push(query) {
      this.$router.push({
        query: {
          ...this.$route.query,
          ...query,
        },
      });
    },
    updateView(view) {
      this.push({
        view,
      });
    },
    updateState(state) {
      this.push({
        state: state.code,
        feature: undefined, // clear basin or reservoir
      });
    },
    updateMetric(metric) {
      this.push({
        metric: metric.code,
        featureType:
          metric.code === "RESC"
            ? "stations"
            : this.metric.code === "RESC"
            ? "basins"
            : this.featureType,
      });
    },
    updateFeature(feature) {
      this.push({
        feature: feature.attributes.FID,
      });
    },
    updateFeatureType(featureType = "basins") {
      this.push({
        featureType,
      });
    },
    clearFeature() {
      this.push({
        feature: undefined,
      });
    },
  },
};

