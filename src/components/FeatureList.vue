<template>
  <div class="feature-list">
    <h3 class="fz-0 demi margin-bottom-half">Basins</h3>

    <calcite-value-list>
      <calcite-value-list-item
        v-for="feature in $store.state.features"
        :key="feature.attributes.OBJECTID"
        :label="feature.attributes.NAME"
        :value="feature.attributes.OBJECTID"
        @click="renderChart(feature.attributes.NAME)"
      />
    </calcite-value-list>
  </div>
</template>

<script>
export default {
  name: "FeatureList",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    renderChart(name) {
      this.$store.commit("chart", { basin: name.split(" ").join('_').toLowerCase() });
    }
  }
};
</script>

<style lang="scss" scoped>
.feature-list {
  width: 100%;
}
</style>
