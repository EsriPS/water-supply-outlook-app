<!--

Table.vue 

-->

<template>
  <iframe class="table-view" :key="src" :src="src" />
</template>

<script>
// Config

export default {
  name: "Table",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    src() {
      const page = "Basins";
      const views = `${this.$store.getters.state.code}%2C${this.$store.getters.metric.code}`;
      // TODO add this url to config
      return `https://experience.arcgis.com/experience/0aa7f700faab4968b2d0afdc2a66231e/page/${page}?views=${views}`;
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
}
</style>
