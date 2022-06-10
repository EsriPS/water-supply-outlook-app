<!--

Table.vue handles the following tasks:
  - Embedding the data table
  - Applying filters the the table
  - Toggling between basins and stations

-->

<template>
  <div class="table-wrapper">
    <!-- Table Control -->
    <!-- toggle between viewing basins and stations in the table -->
    <calcite-radio-group
      v-if="
        !$store.state.is_side_panel_expanded ||
          $store.state.screen_size !== 'xs'
      "
      scale="s"
      class="feature-type-toggle"
      :class="{
        s:
          !$store.state.is_side_panel_expanded ||
          $store.state.screen_size === 'xs',
      }"
    >
      <calcite-radio-group-item
        value="basins"
        :checked="featureType === 'basins'"
        @click="updateFeatureType('basins')"
      >
        Basins
      </calcite-radio-group-item>
      <calcite-radio-group-item
        value="stations"
        :checked="featureType === 'stations'"
        @click="updateFeatureType('stations')"
      >
        {{
          metric.code == "RESC" ? "Reservoirs" : "Stations"
        }}
      </calcite-radio-group-item>
    </calcite-radio-group>

    <!-- Table View -->
    <iframe class="table-view" :src="src" />
  </div>
</template>

<script>
// Mixins
import routeMixins from "@/routeMixins.js";

export default {
  name: "Table",
  mixins: [routeMixins],
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    src() {
      // Base Experience Builder URL
      const url = `https://experience.arcgis.com/experience/${this.$store.state.feature_table_id}`;

      // When viewing all basins in a state
      let filter = `data_filter=dataSource_1-0:btype=%27${this.state.basin_huc_code}%27`;
      let page = "basins";
      let views = `${this.metric.code}_${page}`;

      // When viewing stations for a basin
      if (this.featureType === "stations") {
        const index = ["RESC", "WTEQ", "PREC"].indexOf(
          this.metric.code
        );
        page = "stations";
        views = `${this.metric.code}_${page}`;

        // If viewing a basin
        if (this.feature) {
          filter = `data_filter=dataSource_2-${index}:basins%20like%20%27%25${this.feature.attributes.name}%25%27`;
        }
        // If viewing a state
        else {
          filter = `data_filter=dataSource_2-${index}:state%20like%20%27%25${this.state.code}%25%27`;
        }
      }

      // When viewing the metrics for a basin
      else if (this.feature) {
        filter = `data_filter=dataSource_1-0:name=%27${this.feature.attributes.name}%27`;
      }

      // // When viewing reservoirs
      // else if (this.metric.code === "RESC") {
      //   const name = this.feature?.attributes?.name;
      //   page = "stations";
      //   views = "reservoirs";
      //   if (this.feature) {
      //     filter = `data_filter=dataSource_2-8:basins%20like%20%27%25${name}%25%27`;
      //   } else {
      //     filter = `data_filter=dataSource_2-8:stationTri%20like%20%27%25${this.state.code}%25%27`;
      //   }
      // }

      return `${url}/page/${page}?views=${views}&&${filter}`;
    },
  },
  methods: {},
  mounted() {
    this.$store.commit("status", "OK");
  },
};
</script>

<style lang="scss" scoped>
.table-wrapper {
  flex: 1;
}
.table-view {
  border: none;
  width: 100%;
  height: 100%;
}
.feature-type-toggle {
  position: absolute;
  margin: 1rem;
  &.s {
    left: 2.5rem;
  }
}
</style>

