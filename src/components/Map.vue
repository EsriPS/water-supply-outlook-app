<!--

Map.js is handles all of the application mapping capabilities. 
Map.js handles the following tasks:
  - Initiation of maps
  - Toggling on / off layers and legends
  - Changing the map scope based on basin

-->

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
            $store.getters.metric.show_bivariate_maps
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
          $store.getters.metric.show_bivariate_maps
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
      filterByState: () => {},

      // Legend
      isLegendVisible: this.$store.state.screen_size !== "xs",
      toggleLegend: () => {},

      // Layer List
      isLayerListVisible: false,
      toggleLayerList: () => {},
    };
  },
  watch: {
    "$store.getters.metric.map_id": {
      handler() {
        this.renderMap();
      },
    },
    "$store.getters.state": {
      deep: true,
      immediate: true,
      handler() {
        this.$store.commit("feature");
        this.filterByState();
      },
    },
    "$route.query.feature": {
      deep: true,
      handler() {
        this.goTo();
      },
    },
    "$store.state.screen_size": {
      handler(val) {
        if (val === "xs") {
          if (this.isLegendVisible) this.toggleLegend();
          if (this.isLayerListVisible) this.toggleLayerList();
        }
      },
    },
  },
  computed: {},
  methods: {
    renderMap() {
      loadModules(
        [
          "esri/WebMap",
          // "esri/Map",
          "esri/views/MapView",
          "esri/widgets/Legend",
          "esri/layers/FeatureLayer",
          "esri/widgets/LayerList",
        ],
        { css: true }
      ).then(
        async ([
          WebMap,
          // Map,
          MapView,
          Legend,
          FeatureLayer,
          LayerList,
        ]) => {
          // Load Features
          if (!this.$store.state.features.length) {
            try {
              const layer = new FeatureLayer({
                portalItem: {
                  id: this.$store.state.feature_layer_id,
                },
              });
              const { features } = await layer.queryFeatures();
              const updatedAt = features[0].attributes.EditDate;
              this.$store.commit("updatedAt", updatedAt);
              this.$store.commit("features", features);
              console.log("features");
              this.$store.commit("status", "OK");
            } catch (error) {
              console.log("query failed: ", error);
              this.$store.commit("status", "ERROR");
            }
          }

          // Fetch Correct WebMap
          const map = new WebMap({
            portalItem: {
              id: this.$store.getters.metric.map_id,
            },
          });

          // Define View
          const view = new MapView({
            map,
            container: "viewDiv",
            center: this.$store.getters.state.center,
            zoom: this.$store.getters.state.zoom,
          });

          // Allow Vue to navigate map view
          this.goTo = () => {
            const feature = this.$store.getters.feature;
            view.goTo(
              feature
                ? feature
                : {
                    center: this.$store.getters.state.center,
                    zoom: this.$store.getters.state.zoom,
                  },
              {
                duration: feature ? 500 : 1000,
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

            // Allow vue to control legend
            this.toggleLegend = () => {
              this.isLegendVisible = !this.isLegendVisible;
              legend.visible = !legend.visible;
              if (this.$store.state.screen_size === "xs") {
                layerList.visible = false;
                this.isLayerListVisible = false;
              }
            };

            // Allow vue to control layer list
            this.toggleLayerList = () => {
              this.isLayerListVisible = !this.isLayerListVisible;
              layerList.visible = !layerList.visible;

              if (this.$store.state.screen_size === "xs") {
                legend.visible = false;
                this.isLegendVisible = false;
              }
            };

            // When layer loads
            const layer = map.layers.getItemAt(1);
            view
              .whenLayerView(layer)
              .then((layerView) => {
                // Allow vue to filter basins by state
                this.filterByState = () => {
                  layerView.filter = {
                    where: `btype = '${this.$store.getters.state.basin_huc_code}'`,
                  };
                };
                // Filter features by state
                this.filterByState();
              })
              .catch((err) => console.log(err));

            // Zoom to basin if selected
            if (this.$store.getters.feature) {
              this.goTo(this.$store.getters.feature);
            }

            this.isInitialized = true;
          });
        }
      );
    },
  },
  mounted() {
    // Render map
    this.renderMap();
  },
  beforeDestroy() {
    if (this.view) {
      // Destroy the map view
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
