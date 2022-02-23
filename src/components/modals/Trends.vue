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
      :src="$store.getters.trendsSrc"
    />
  </calcite-modal>
</template>

<script>
export default {
  name: "TrendsModal",
  components: {},
  props: {},
  data: function() {
    return {
      active: true,
      metrics: [],
    };
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
