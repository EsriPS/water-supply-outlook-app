<template>
  <div class="view-wrapper rel">
    <div id="viewDiv" />
    <!-- Legend Toggle -->
    <calcite-tooltip-manager>
      <calcite-action
        v-if="
          !$store.state.is_side_panel_expanded ||
            $store.state.screen_size !== 'xs'
        "
        :class="{ active: isLegendVisible }"
        appearance="clear"
        scale="s"
        color="grey"
        icon="legend"
        @click="toggleLegend"
        class="map-btn legend-btn"
        id="legend-btn"
      />
    </calcite-tooltip-manager>
    <calcite-tooltip
      v-if="
        !$store.state.is_side_panel_expanded ||
          $store.state.screen_size !== 'xs'
      "
      reference-element="legend-btn"
      placement="auto"
      offset-distance="6"
    >
      Legend
    </calcite-tooltip>

    <!-- Layer View Toggle -->
    <calcite-tooltip-manager>
      <calcite-action
        v-if="
          (!$store.state.is_side_panel_expanded ||
            $store.state.screen_size !== 'xs') &&
            $store.getters.view.show_bivariate_maps
        "
        :class="{ active: isLayerListVisible }"
        appearance="clear"
        scale="s"
        color="grey"
        icon="layers"
        @click="toggleLayerList"
        class="map-btn layer-btn"
        id="layer-btn"
      />
    </calcite-tooltip-manager>
    <calcite-tooltip
      v-if="
        (!$store.state.is_side_panel_expanded ||
          $store.state.screen_size !== 'xs') &&
          $store.getters.view.show_bivariate_maps
      "
      reference-element="layer-btn"
      placement="auto"
      offset-distance="6"
    >
      Toggle on / off bivariate layers
    </calcite-tooltip>
  </div>
</template>

<script>
// ArcGIS
import { loadModules } from "esri-loader";

// Config

export default {
  name: "Map",
  components: {},
  props: {},
  data() {
    return {
      isInitialized: false,
      goTo: () => {},

      // Legend
      isLegendVisible: this.$store.state.screen_size !== "xs",
      toggleLegend: () => {},

      // Layer List
      isLayerListVisible: false,
      toggleLayerList: () => {},
    };
  },
  watch: {
    "$store.getters.view.map_id": {
      handler() {
        this.isInitialized = false;
        this.renderMap();
      },
    },
    "$route.query.feature": {
      deep: true,
      handler() {
        this.goTo();
      },
    },
  },
  computed: {},
  methods: {
    renderMap() {
      loadModules(
        [
          "esri/WebMap",
          "esri/views/MapView",
          "esri/widgets/Legend",
          "esri/layers/FeatureLayer",
          "esri/widgets/LayerList",
        ],
        { css: true }
      ).then(async ([WebMap, MapView, Legend, FeatureLayer, LayerList]) => {
        // Load Features
        if (!this.$store.state.features.length) {
          try {
            const lyr = new FeatureLayer({
              portalItem: {
                id: this.$store.state.feature_layer_id,
              },
            });
            const { features } = await lyr.queryFeatures();
            const updatedAt = features[0].attributes.EditDate;
            this.$store.commit("updatedAt", updatedAt);
            this.$store.commit("features", features);
            this.$store.commit("status", "OK");
          } catch (error) {
            console.log("query failed: ", error);
            this.$store.commit("status", "ERROR");
          }
        }

        // Fetch Correct WebMap
        const map = new WebMap({
          portalItem: {
            id: this.$store.getters.view.map_id,
          },
        });

        // Define View
        const center = this.$store.getters.state.center;
        const zoom = this.$store.getters.state.zoom;
        const view = new MapView({
          container: "viewDiv",
          map,
          center,
          zoom,
        });

        // Allow Vue to navigate map view
        this.goTo = () => {
          const feature = this.$store.getters.feature;
          view.goTo(
            feature
              ? feature
              : {
                  center,
                  zoom,
                }
          );
        };

        view.when(async () => {
          const visible = this.$store.state.screen_size !== "xs";

          // Add Legend
          const legend = new Legend({
            view,
            visible,
            layerInfos: map.allLayers.items
              .filter((layer) => layer.type == "feature")
              .map((layer) => {
                return {
                  layer,
                };
              }),
          });
          view.ui.add(legend, "bottom-right");

          // Add Layer Toggle Legend
          const layerList = new LayerList({
            view,
            visible: false,
          });
          view.ui.add(layerList, "bottom-right");

          // Allow vue to control legend and layer list
          this.toggleLegend = () => {
            this.isLegendVisible = !this.isLegendVisible;
            legend.visible = !legend.visible;
            layerList.visible = false;
            this.isLayerListVisible = false;
          };

          this.toggleLayerList = () => {
            this.isLayerListVisible = !this.isLayerListVisible;
            layerList.visible = !layerList.visible;
            legend.visible = false;
            this.isLegendVisible = false;
          };

          // Zoom to basin if selected
          if (this.$store.getters.feature) {
            this.goTo(this.$store.getters.feature);
          }

          this.isInitialized = true;
        });
      });
    },
  },
  mounted() {
    this.renderMap();
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
.view-wrapper {
  flex: 1;
}

#viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

.map-btn {
  z-index: 1;
  left: 15px;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  &.active {
    background-color: #d2e9f9 !important;
  }
}

.legend-btn {
  top: 100px;
}

.layer-btn {
  top: 133px;
}
</style>
