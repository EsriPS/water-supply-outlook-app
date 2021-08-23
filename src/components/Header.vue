<template>
  <header class="app-header space-between">
    <!-- Logo an Title -->
    <div class="flex align-center">
      <img class="header-logo margin-right-1" src="@/assets/nrcs-logo.png" />
      <div>
        <h1 class="margin-0 fz-0 margin-bottom-quarter demi">
          Utah Climate and Water Report
        </h1>
        <h2
          class="margin-0 fz--1 margin-bottom-quarter text-light text-regular"
        >
          Natural Resources Conservation Service
        </h2>
      </div>
    </div>

    <div class="align-center">
      <div class="header-button-group margin-right-1 padding-right-1">
        <!-- View Toggle -->
        <calcite-button
          v-for="(view) in $store.state.views"
          :key="view.name"
          :appearance="$store.state.view.name === view.name ? 'solid' : 'transparent'"
          @click="$store.commit('view', view)"
          scale="s"
        >
          {{ view.name }}
        </calcite-button>
      </div>

      <!-- Download Btn -->
      <calcite-button scale="s" appearance="clear">
        Download PDF Report
      </calcite-button>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  async beforeMount() {
    await this.$store.commit("view", this.$store.state.views[0]);
  }
};
</script>

<style lang="scss" scoped>
.app-header {
  background: var(--calcite-ui-foreground-1);
  box-shadow: 0px 1px 2px var(--calcite-ui-border-2);
  z-index: 2;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 0.5rem 2rem;
}
.header-logo {
  width: 32px;
  height: 32px;
}
.header-button-group {
  border-right: 1px solid var(--calcite-ui-border-2);
}
</style>
