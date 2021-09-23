<!--

FeatureList.js handles the following:
  - Rendering a list of basins
  - Allowing the user to select a basin to focus on

-->

<template>
  <div class="feature-list-container">
    <h3 class="margin-0 fz--1 demi padding-bottom-half border-bottom">
      Basins
    </h3>

    <div class="feature-list">
      <calcite-value-list class="features">
        <calcite-value-list-item
          v-for="feature in features"
          :key="feature.attributes.FID"
          :label="feature.attributes.name"
          :value="feature.attributes.FID"
          :selected="
            $store.getters.feature
              ? feature.attributes.FID === $store.getters.feature.attributes.FID
              : false
          "
          @click="$store.commit('feature', feature)"
        />
      </calcite-value-list>
    </div>
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
  computed: {
    features() {
      return [...this.$store.state.features].sort((a, b) =>
        a.attributes.name.localeCompare(b.attributes.name)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.border-bottom {
  border-bottom: 1px solid var(--calcite-ui-border-3);
}

.feature-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.feature-list {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  .features {
    margin: 1px;
  }
}
</style>
