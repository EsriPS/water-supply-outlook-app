<template>
  <div
    class="rel"
    :class="{
      'full-width':
        $store.state.screen_size === 'xs' &&
        $store.state.is_side_panel_expanded,
    }"
  >
    <aside
      v-if="$store.state.is_side_panel_expanded"
      class="app-side-panel"
      :class="{
        'padding-top-1 padding-right-2 padding-left-2':
          $store.state.screen_size === 'm',
        'padding-top-half padding-right-half padding-left-half':
          $store.state.screen_size !== 'm',
        xs: $store.state.screen_size === 'xs',
      }"
    >
      <!-- State Scope -->
      <div>
        <span
          class="space-between align-center margin-bottom-1"
          style="z-index: 1000;"
        >
          <h3 v-if="$store.getters.feature" class="margin-0 fz--1 demi z-1">
            <a
              href="javascript:void(0)"
              @click="$store.commit('feature')"
              class="back-btn focus-border"
            >
              {{ `State of ${$store.getters.state.name}` }}
            </a>
            <span class="margin-left-quarter margin-right-quarter">
              /
            </span>
            <span class="margin-left--half">
              {{ $store.getters.feature.attributes.name }}
            </span>
          </h3>
          <h3 v-else class="margin-0 fz--1 demi z-1">
            {{ `State of ${$store.getters.state.name}` }}
          </h3>
          <calcite-button
            appearance="transparent"
            scale="m"
            color="grey"
            icon-end="chevrons-left"
            @click="$store.commit('toggleSidePanel')"
          />
        </span>
        <Charts v-if="$store.state.status === 'OK'" style="z-index: 0;" />
        <div class="space-between margin-bottom-2">
          <calcite-button
            appearance="clear"
            @click="viewChart('trends')"
            class="full-width"
            scale="s"
          >
            View Trends
          </calcite-button>
          <calcite-button
            v-if="$store.getters.feature"
            appearance="clear"
            class="margin-left-half full-width"
            @click="viewChart('forecast')"
            scale="s"
          >
            View Precip Forecasts
          </calcite-button>
        </div>
      </div>
      <FeatureList class="side-panel-lower" />
      <div class="padding-top-half padding-bottom-half border-top">
        <p class="fz--2 margin-0">{{ updatedAt }}</p>
      </div>
    </aside>

    <div
      v-if="!$store.state.is_side_panel_expanded"
      :class="{ lower: $store.getters.view.show_bivariate_maps }"
      class="expand-btn-wrapper"
    >
      <calcite-tooltip-manager>
        <calcite-action
          appearance="clear"
          scale="s"
          class="expand-btn"
          color="grey"
          icon="chevrons-right"
          id="expand-btn"
          @click="$store.commit('toggleSidePanel')"
        />
      </calcite-tooltip-manager>
      <calcite-tooltip
        reference-element="expand-btn"
        placement="auto"
        offset-distance="6"
      >
        Expand Metrics Panel
      </calcite-tooltip>
    </div>
  </div>
</template>

<script>
import FeatureList from "./FeatureList.vue";
import Charts from "./Charts.vue";

export default {
  name: "SidePanel",
  components: { FeatureList, Charts },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    updatedAt() {
      // const months = [
      //   "January",
      //   "Febuary",
      //   "March",
      //   "March",
      //   "May",
      //   "June",
      //   "July",
      //   "August",
      //   "September",
      //   "Octorber",
      //   "November",
      //   "December",
      // ];
      if (!this.$store.state.updated_at) {
        return "...";
      }
      const today = new Date(this.$store.state.updated_at);
      // const dataMonth = months[today.getMonth() - 1];
      // const year = today.getFullYear();
      // const dataYear = today.getMonth() === 0 ? year - 1 : year;
      // return `Showing data for ${dataMonth} ${dataYear}.  Updated ${today.toLocaleDateString()}.`;
      return `Showing data for March 2021.  Updated ${today.toLocaleDateString()}.`;
    },
  },
  methods: {
    viewChart(chart) {
      if (this.$store.state.screen_size !== "xs") {
        this.$store.commit("toggleModal", chart);
      } else {
        window.open(this.$store.getters[`${chart}Src`], "_blank").focus();
      }
    },
  },
  beforeMount() {
    if (this.$store.state.screen_size === "xs") {
      this.$store.commit("toggleSidePanel");
    }
  },
};
</script>

<style lang="scss" scoped>
.app-side-panel {
  box-sizing: border-box;
  height: calc(100vh - 55px);
  width: 360px;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  &.xs {
    width: 100%;
    height: calc(100vh - 43px);
  }
}

.back-btn {
  color: var(--calcite-ui-text-1);
  opacity: 0.6;
  transition: 0.2s;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: var(--calcite-ui-text-1);
    text-decoration: none;
    opacity: 1;
  }
}

.expand-btn {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.expand-btn-wrapper {
  z-index: 1;
  top: 150px;
  left: 15px;
  position: absolute;
  &.lower {
    top: 185px;
  }
}

.side-panel-lower {
  flex: 1;
}

.z-1 {
  z-index: 1;
}

.border-top {
  border-top: 1px solid var(--calcite-ui-border-3);
}
</style>
