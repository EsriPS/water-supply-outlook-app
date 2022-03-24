<!--

Trends.js handles the following tasks:
  - Rendering the Plottly trend charts provided by NRCS

-->

<template>
  <calcite-modal
    :active="active"
    @calciteModalClose="onClose()"
    background-color="white"
    width="l"
  >
    <iframe
      slot="content"
      scrolling="no"
      title="Chart Title"
      class="trends-chart"
      :src="trendsSrc"
    />
  </calcite-modal>
</template>

<script>
// Mixins
import routeMixins from "@/routeMixins.js";

export default {
  name: "TrendsModal",
  mixins: [routeMixins],
  components: {},
  props: {},
  data: function() {
    return {
      active: true,
      metrics: [],
    };
  },
  computed: {
    trendsSrc() {
      const scope = this.feature
        ? this.feature.attributes.name
            .split(" ")
            .join("_")
            .toLowerCase()
        : `state_of_${this.state.name.toLowerCase()}`;
      const hucCode = this.state[
        this.feature ? "basin_huc_code" : "state_huc_code"
      ];
      return `${this.$store.state.trends_base_url}/${this.metric.code}/stdHUC${hucCode}/${scope}.html`;
    },
  },
  methods: {
    async onClose() {
      this.active = false;
      await new Promise((resolve) => setTimeout(resolve, 200));
      this.$store.commit("toggleModal", "trends");
    },
  },
};
</script>
<style lang="scss" scoped>
.trends-chart {
  display: block;
  width: calc(99% + 16px);
  height: calc(99% + 1rem);
  min-height: 660px;
  margin: -1rem -8px 0 -8px;
  border: none;
}
</style>
