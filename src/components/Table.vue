<!--

Table.vue 

-->

<template>
  <iframe class="table-view" :src="src" />
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
      const url =
        "https://experience.arcgis.com/experience/0aa7f700faab4968b2d0afdc2a66231e/page/";

      // When viewing all basins in a state
      let filter = `data_filter=dataSource_2-0:btype=%27${this.state.basin_huc_code}%27`;
      let page = "basins";
      let views = `${this.metric.code}_${page}`;

      // When viewing stations for a basin
      if (this.feature && this.metric.code !== "RESC") {
        const index = this.metrics
          .map((metric) => metric.code)
          .indexOf(this.metric.code);
        const name = this.feature.attributes.name;
        page = "stations";
        views = `${this.metric.code}_${page}`;
        filter = `data_filter=dataSource_5-${index}:basins%20like%20%27%25${name}%25%27`;
      }

      // When vieing reservoirs
      if (this.metric.code === "RESC") {
        const name = this.feature?.attributes?.name;
        page = "stations";
        views = "reservoirs";
        if (this.feature) {
          filter = `data_filter=dataSource_4-0:basins%20like%20%27%25${name}%25%27`;
        } else {
          filter = `data_filter=dataSource_4-0:stationTri%20like%20%27%25${this.state.code}%25%27`;
        }
      }

      return `${url}${page}?views=${views}&&${filter}`;
    },
  },
  methods: {},
  mounted() {
    this.$store.commit("status", "OK");
  },
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.table-view {
  flex: 1;
  border: none;
  margin-bottom: -13px;
}
</style>
