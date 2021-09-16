<template>
  <header
    class="app-header space-between padding-top-half padding-bottom-half"
    :class="{
      'padding-right-2 padding-left-2': $store.state.screen_size === 'm',
      'padding-right-half padding-left-half': $store.state.screen_size !== 'm',
    }"
  >
    <!-- Logo and Title -->
    <div class="flex align-center">
      <img class="header-logo margin-right-half" src="@/assets/nrcs-logo.png" />
      <div v-if="$store.state.screen_size !== 'xs'">
        <h1 class="margin-0 fz--1 margin-bottom-quarter demi">
          {{
            `${
              $store.state.state ? $store.state.state.name : ""
            } Climate and Water Report`
          }}
        </h1>
        <h2
          class="margin-0 fz--2 margin-bottom-quarter text-light text-regular"
        >
          Natural Resources Conservation Service
        </h2>
      </div>
    </div>

    <div v-if="$store.state.state && $store.state.view" class="align-center">
      <div class="header-button-group margin-right-1 padding-right-1">
        <!-- View Toggle Small Screens -->
        <calcite-dropdown
          v-if="$store.state.screen_size !== 'm'"
          placement="bottom-trailing"
        >
          <calcite-button
            slot="dropdown-trigger"
            appearance="clear"
            scale="s"
            icon-end="chevron-down"
          >
            Select Metric
          </calcite-button>
          <calcite-dropdown-group selection-mode="single" role="menu">
            <calcite-dropdown-item
              v-for="view in $store.state.views"
              :key="view.name"
              :disabled="$store.state.status === 'PENDING'"
              :active="$store.state.view.name === view.name"
              @click="$store.commit('view', view)"
            >
              {{ view.name }}
            </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>

        <!-- View Toggle Large Screens -->
        <calcite-button
          v-else
          v-for="view in $store.state.views"
          :key="view.name"
          :disabled="$store.state.status === 'PENDING'"
          :appearance="
            $store.state.view.name === view.name ? 'solid' : 'transparent'
          "
          @click="$store.commit('view', view)"
          scale="s"
        >
          {{ view.name }}
        </calcite-button>
      </div>

      <!-- Download Btn -->
      <calcite-button scale="s" appearance="clear">
        Download Monthly Report
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
}
.header-logo {
  width: 24px;
  height: 24px;
}
.header-button-group {
  border-right: 1px solid var(--calcite-ui-border-2);
}
</style>
