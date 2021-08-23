<template>
  <aside class="app-side-panel">
    <h3 class="fz-0 demi margin-bottom-2">Utah</h3>

    <FeatureList />
  </aside>
</template>

<script>
import FeatureList from "./FeatureList.vue";

export default {
  name: "SidePanel",
  components: { FeatureList },
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
.app-side-panel {
  box-sizing: border-box;
  padding: 0.5rem 2rem;
  width: 400px;
  overflow-y: auto;
}
</style>
