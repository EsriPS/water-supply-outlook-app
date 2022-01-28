<!--

Table.vue 

-->

<template>
  <iframe
    class="table-view"
    src="https://experience.arcgis.com/experience/0aa7f700faab4968b2d0afdc2a66231e"
  />
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
  computed: {},
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
  height: calc(100% + 2.75rem);
  min-height: 660px;
  margin-top: -2.75rem;
}
</style>
