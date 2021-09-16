<template>
  <div id="viewDiv" />
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
      goTo: null,
      add: null,
    };
  },
  watch: {
    "$store.state.view.map_id": {
      handler() {
        this.isInitialized = false;
        this.renderMap();
      },
    },
    "$store.state.feature": {
      deep: true,
      handler(feature) {
        this.goTo(feature);
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
        ],
        { css: true }
      ).then(async ([WebMap, MapView, Legend, FeatureLayer]) => {
        // Load Features
        if (!this.$store.state.features.length) {
          try {
            const lyr = new FeatureLayer({
              portalItem: {
                id: this.$store.state.feature_layer_id,
              },
            });
            const { features } = await lyr.queryFeatures();
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
            id: this.$store.state.view.map_id,
          },
        });

        // Define View
        const view = new MapView({
          container: "viewDiv",
          map,
          center: this.$store.state.state.center,
          zoom: this.$store.state.state.zoom,
        });

        // Allow Vue to navigate map view
        this.goTo = (feature) => {
          view.goTo(
            feature
              ? feature
              : {
                  center: this.$store.state.state.center,
                  zoom: this.$store.state.state.zoom,
                }
          );
        };

        view.when(async () => {
          // Define Correct Feature Layer
          // const featureLayer = map.allLayers.items.find(
          //   (item) => item.id === this.$store.state.view.primary_layer_id
          // );

          const legend = new Legend({
            view,
            layerInfos: map.allLayers.items
              .filter((layer) => layer.type == "feature")
              .map((layer) => {
                return {
                  layer: layer,
                };
              }),
          });
          view.ui.add(legend, "bottom-right");

          // Add Legend

          // const layerList = new LayerList({
          //   view: view,
          //   listItemCreatedFunction: function(event) {
          //     const item = event.item;
          //     if (item.layer.type == "feature") {
          //       // don't show legend twice
          //       item.panel = {
          //         content: "legend",
          //         open: item.layer.id === featureLayer.id,
          //       };
          //     }
          //   },
          // });
          // view.ui.add(layerList, "bottom-right");

          // Zoom to basin if selected
          if (this.$store.state.feature) {
            this.goTo(this.$store.state.feature);
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
#viewDiv {
  padding: 0;
  margin: 0;
  flex: 1;
}
</style>
