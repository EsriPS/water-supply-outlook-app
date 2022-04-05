<!--

Forecast.js handles the following tasks:
  - Rendering the forecast charts provided by NRCS

-->

<template>
  <calcite-modal
    :active="active"
    @calciteModalClose="onClose()"
    background-color="white"
    width="830"
  >
    <div slot="content">
      <transition name="fade" mode="out-in">
        <div v-if="!isInitialized" class="align-center load-initial">
          <calcite-loader active="" type="indeterminate" />
        </div>
      </transition>
      <iframe
        class="forcasting-chart"
        :class="{ embedded: $route.query.embedded, hidden: !isInitialized }"
        title="Chart Title"
        :src="forecastSrc"
        scrolling="no"
      />
    </div>
  </calcite-modal>
</template>

<script>
// Mixins
import routeMixins from "@/routeMixins.js";

export default {
  name: "ForecastModal",
  mixins: [routeMixins],
  components: {},
  props: {},
  data: function() {
    return {
      isInitialized: false,
      active: true,
    };
  },
  computed: {
    forecastSrc() {
      return `${this.$store.state.forecast_base_url}/#state=${this.state.code}&basin=${this.feature.attributes.name.toUpperCase()}&year=${new Date().getFullYear()}&pubDate=1-1&period=all&chartWidth=800`;
    },
  },
  methods: {
    async onClose() {
      this.active = false;
      await new Promise((resolve) => setTimeout(resolve, 200));
      this.$store.commit("toggleModal", "forecast");
    },
  },
  mounted() {
    setTimeout(() => (this.isInitialized = true), 2200);
  },
};
</script>
<style lang="scss" scoped>
.forcasting-chart {
  border: 0px none;
  margin-left: -22px;
  min-height: 1110px;
  margin-top: -630px;
  margin-bottom: calc(0px - var(--calcite-modal-padding-large));
  width: calc(100% + 22px + var(--calcite-modal-padding-large));
  &.embedded {
    margin-top: -728px;
  }
  &.hidden {
    opacity: 0;
  }
}

.load-initial {
  width: calc(100% - var(--calcite-modal-padding-large) * 2);
  height: calc(100% - var(--calcite-modal-padding-large) * 2);
  margin: -2px 0;
}
</style>
