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
            metric.show_bivariate_maps
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
          metric.show_bivariate_maps
      "
      reference-element="layer-btn"
      placement="auto"
      offset-distance="6"
    >
      Bivariate layers
    </calcite-tooltip>
  </div>
</template>

<script>
// ArcGIS
import { loadModules } from "esri-loader";

// Mixins
import routeMixins from "@/routeMixins.js";

export default {
  name: "Map",
  mixins: [routeMixins],
  components: {},
  props: {},
  data() {
    return {
      isInitialized: false,
      stateGeometries: [],

      // Map Methods
      goTo: () => {},
      highlight: () => {},
      getPopupContent: () => {},
      filterBasinsByState: () => {},
      filterSitesByState: () => {},

      // Legend
      isLegendVisible: this.$store.state.screen_size !== "xs",
      toggleLegend: () => {},

      // Layer List
      isLayerListVisible: false,
      toggleLayerList: () => {},
    };
  },
  watch: {
    "metric.map_id": {
      handler() {
        this.renderMap();
      },
    },
    feature: {
      deep: true,
      immediate: true,
      handler() {
        this.goTo();
        this.highlight();
        if (!this.feature) {
          this.filterBasinsByState();
          this.filterSitesByState();
        }
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
          "esri/views/MapView",
          "esri/widgets/Legend",
          "esri/layers/FeatureLayer",
          "esri/widgets/LayerList",
        ],
        { css: true }
      ).then(async ([WebMap, MapView, Legend, FeatureLayer, LayerList]) => {
        // Load features
        if (!this.$store.state.features.length) {
          try {
            const layer = new FeatureLayer({
              portalItem: {
                id: this.$store.state[`basins_feature_layer_id`],
              },
            });
            const { features } = await layer.queryFeatures();
            console.log({ features });
            this.$store.commit("updatedAt", features[0]);
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
            id: this.metric.map_id,
          },
        });

        // Define View
        const view = new MapView({
          map,
          container: "viewDiv",
          center: this.state.center,
          zoom: this.state.zoom,
        });

        // Allow Vue to navigate map view
        this.goTo = () => {
          view.goTo(
            this.feature
              ? this.feature
              : {
                  center: this.state.center,
                  zoom: this.state.zoom,
                },
            {
              duration: this.feature ? 500 : 1000,
            }
          );
        };

        view.when(() => {
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
          view.ui.add(legend, "bottom-left");

          // Add Layer Toggle Legend
          const layerList = new LayerList({
            view,
            visible: false,
          });
          view.ui.add(layerList, "bottom-left");

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

          // Get stations feature layer
          const sitesLayer = map.layers.find((l) =>
            ["Sites", "Reservoirs"].includes(l.title)
          );
          view.whenLayerView(sitesLayer).then((layerView) => {
            // Allow vue to filter features by state
            this.filterSitesByState = () => {
              layerView.filter = {
                where: `
                      stationTriplet LIKE '%${this.state.code}%'
                    `,
              };
            };
            this.filterSitesByState();
          });

          // Get basins layer
          const basinsLayer = map.layers.find((l) => l.title === "Basins");

          // Add basin layer class breaks to store
          if (this.metric.classBreaks) {
            this.$store.commit("classBreaks", {
              metric: this.metric,
              classBreaks: basinsLayer?.renderer?.classBreakInfos,
            });
          }

          view
            .whenLayerView(basinsLayer)
            .then((layerView) => {
              // Allow vue to filter features by state
              this.filterBasinsByState = () => {
                layerView.filter = {
                  where: `
                      btype = '${this.state.basin_huc_code}'
                    `,
                };
              };

              // Filter features by state
              this.filterBasinsByState();

              // Highlight Selected Feature
              this.highlight = () => {
                if (this.feature) {
                  const where = `id = '${this.feature?.attributes.id}'`;
                  layerView.effect = {
                    includedEffect: this.metric.includedEffect,
                    excludedEffect: this.metric.excludedEffect,
                    filter: { where },
                  };
                } else {
                  layerView.effect = {
                    includedEffect: this.metric.baseEffect,
                  };
                }
              };

              // Watch for user clicking on a feature
              view.on("click", (event) => {
                view.hitTest(event).then((event) => {
                  // Perform a hitTest on the View
                  // Make sure graphic has a popupTemplate
                  const results = event.results.filter((result) => {
                    return result.graphic.layer.popupTemplate;
                  });
                  const result = results[0];
                  const FID = result?.graphic?.attributes.FID;
                  const feature = this.features.find(
                    (f) => f.attributes.FID === FID
                  );
                  const isNewFeature = FID !== this.feature?.attributes.FID;
                  // If we find a basin, update the focussed feature
                  if (feature && isNewFeature) {
                    this.updateFeature(feature);
                  }

                  // If the user clicked outside all basins, zoom
                  // back to state level
                  else if (!results?.length) {
                    this.clearFeature();
                    this.goTo();
                  }
                });
              });

              // Zoom to feature if selected
              if (this.feature) {
                this.goTo(this.feature);
                this.highlight();
                this.getPopupContent();
              }

              this.isInitialized = true;
            })
            .catch((err) => console.log(err));
        });
      });
    },
  },
  mounted() {
    // Render map
    this.renderMap();
  },
};
</script>

<style lang="scss">
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
  top: 88px;
}

.layer-btn {
  top: 133px;
}

.info-btn {
  top: 166px;
}
.esri-popup__footer--has-actions {
  display: none !important;
}
</style>

