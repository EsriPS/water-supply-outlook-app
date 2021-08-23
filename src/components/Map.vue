<template>
  <div id="viewDiv" />
</template>

<script>
// ArcGIS
import { loadModules } from "esri-loader";

export default {
  name: "Map",
  components: {},
  props: {},
  data() {
    return {
      // map: null,
      view: null
    };
  },
  watch: {
    "$store.state.view.map_id": {
      handler() {
        this.renderMap();
      }
    }
  },
  computed: {},
  methods: {
    renderMap() {
      loadModules(
        ["esri/WebMap", "esri/views/MapView", "esri/widgets/Legend"],
        { css: true }
      ).then(([WebMap, MapView, Legend]) => {
        const map = new WebMap({
          portalItem: {
            id: this.$store.state.view.map_id
          }
        });

        // const foundTable = this.map.allLayers
        // console.log(foundTable)

        const view = new MapView({
          container: "viewDiv",
          map,
          center: [-110, 39.8],
          zoom: 7
        });

        view.when(async () => {
          // Define Correct Feature Layer
          const featureLayer = map.allLayers.items.find(
            item => item.title === this.$store.state.view.name
          );

          // Add Legend for Feature Layer
          const legend = new Legend({
            view: view,
            layerInfos: [
              {
                layer: featureLayer
              }
            ]
          });
          view.ui.add(legend, "bottom-right");

          // Query Features from Feature Layer and add to State
          try {
            const layerView = await view.whenLayerView(featureLayer);
            ((context = this) => {
              layerView.watch("updating", async function(value) {
                if (!value) {
                  const res = await layerView.queryFeatures();
                  console.log(res.features);
                  await context.$store.commit("features", res.features);
                  context.$store.commit("status", "OK");
                }
              });
            })();
          } catch (error) {
            console.log("query failed: ", error);
            this.$store.commit("status", "ERROR");
          }
        });
      });
    }
  },
  mounted() {
    this.renderMap();
  },
  beforeDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
};
</script>

<style lang="scss" scoped>
#viewDiv {
  padding: 0;
  margin: 0;
  flex: 1;
}
</style>
