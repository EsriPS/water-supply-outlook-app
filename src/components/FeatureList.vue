<!--

FeatureList.vue handles the following:
  - Rendering a list of basins
  - Allowing the user to select a basin to focus on

-->

<template>
  <div class="feature-list-container">
    <!-- Features Title -->
    <h3 class="margin-0 fz--1 demi padding-bottom-half border-bottom">
      Basins
    </h3>

    <!-- Feature List -->
    <div class="feature-list">
      <calcite-value-list class="basins">
        <calcite-value-list-item
          v-for="featureOption in featuresOptions"
          :key="featureOption.attributes.OBJECTID"
          :label="featureOption.attributes.name"
          :value="featureOption.attributes.OBJECTID"
          @click="updateFeature(featureOption)"
        />
      </calcite-value-list>
    </div>
  </div>
</template>

<script>
// Mixins
import routeMixins from "@/routeMixins.js";

export default {
  name: "FeatureList",
  mixins: [routeMixins],
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {}
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
  .basins {
    margin: 1px;
  }
}
</style>
