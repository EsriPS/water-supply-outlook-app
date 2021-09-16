<template>
  <calcite-modal
    :active="active"
    @calciteModalClose="onClose()"
    background-color="white"
    width="845"
  >
    <div slot="content">
      <transition name="fade" mode="out-in">
        <div v-if="!this.isInitialized" class="align-center load-initial">
          <calcite-loader active="" type="indeterminate" />
        </div>
      </transition>
      <iframe
        class="forcasting-chart"
        title="Chart Title"
        :src="$store.getters.forecastSrc"
        scrolling="no"
      />
    </div>
  </calcite-modal>
</template>

<script>
export default {
  name: "ForecastModal",
  components: {},
  props: {},
  data: function() {
    return {
      isInitialized: false,
      active: true,
    };
  },
  methods: {
    async onClose() {
      this.active = false;
      await new Promise((resolve) => setTimeout(resolve, 200));
      this.$store.commit("toggleModal", "forecast");
    },
  },
  mounted() {
    setTimeout(() => this.isInitialized = true, 1800);
  },
};
</script>
<style lang="scss" scoped>
.forcasting-chart {
  border: 0px none;
  margin-left: -22px;
  min-height: 1858px;
  margin-top: -728px;
  width: 826px;
}

.load-initial {
  width: calc(100% - var(--calcite-modal-padding-large) * 2);
  height: calc(100% - var(--calcite-modal-padding-large) * 2);
  margin: -2px 0;
}
</style>
