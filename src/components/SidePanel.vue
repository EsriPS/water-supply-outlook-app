<!--

SidePanel.js is a container for the FeatureList and 
Charts components. It also handles the following:
  - Side panel styles 
  - Rendering selected basin name
  - Ability to open / close the panel

-->

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
      <!-- Loading State -->
      <transition name="fade" mode="out-in">
        <div v-if="!features.length" class="align-center full-width">
          <calcite-loader active type="indeterminate" />
        </div>
      </transition>

      <!-- Title and charts -->
      <div v-if="features.length">
        <span
          class="space-between margin-bottom-1"
          style="z-index: 100; min-height: 68px;"
        >
          <div v-if="feature" class="margin-0 fz--1 z-1">
            <!-- Link back to state view -->
            <a
              href="javascript:void(0)"
              @click="clearFeature"
              class="back-btn focus-border align-center demi"
            >
              <calcite-icon
                scale="s"
                icon="chevron-left"
                class="margin-right-quarter"
              />
              <span>{{ `State of ${state.name}` }}</span>
            </a>

            <!-- Basin Select Dropdown -->
            <div class="align-center margin-top-half margin-trailer-half">
              <span class="margin-right-quarter">Basin:</span>
              <calcite-dropdown
                placement="bottom-leading"
                overlay-positioning="fixed"
                scale="m"
                max-items="8"
              >
                <calcite-button
                  slot="dropdown-trigger"
                  appearance="transparent"
                  icon-end="chevron-down"
                  scale="m"
                >
                  {{ feature.attributes.name }}
                </calcite-button>
                <calcite-dropdown-group
                  selection-mode="single"
                  role="menu"
                  group-title="Select a Basin"
                >
                  <calcite-dropdown-item
                    v-for="featureOption in featuresOptions"
                    :key="featureOption.attributes.FID"
                    :label="featureOption.attributes.name"
                    :value="featureOption.attributes.FID"
                    :active="
                      featureOption.attributes.FID === feature.attributes.FID
                    "
                    @click="updateFeature(featureOption)"
                  >
                    {{ featureOption.attributes.name }}
                  </calcite-dropdown-item>
                </calcite-dropdown-group>
              </calcite-dropdown>
            </div>
          </div>

          <h3 v-else class="margin-0 fz--1 demi z-1">
            {{ `State of ${state.name}` }}
          </h3>
          <calcite-button
            v-if="['xs', 's'].includes($store.state.screen_size)"
            appearance="transparent"
            scale="m"
            color="grey"
            icon-end="map"
            @click="$store.commit('toggleSidePanel')"
          />
        </span>

        <!-- Charts  -->
        <Charts
          v-if="metric.charts.length"
          :key="$store.state.screen_size"
          style="z-index: 0;"
        />

        <!-- Basin Buttons -->
        <div
          class="space-between margin-bottom-1"
          v-if="metric.code !== 'RESC'"
        >
          <calcite-button
            appearance="clear"
            @click="viewChart('trends')"
            class="full-width"
            scale="s"
          >
            View Trends
          </calcite-button>
          <calcite-button
            v-if="feature"
            appearance="clear"
            class="margin-left-half full-width"
            @click="viewChart('forecast')"
            scale="s"
          >
            View Precip Forecasts
          </calcite-button>
        </div>
      </div>

      <FeatureList
        v-if="features.length && !feature"
        class="side-panel-lower"
      />

      <FeatureDetails
        v-else-if="feature"
        style="z-index: 99;"
        class="side-panel-lower"
      />

      <!-- Updated At -->
      <div
        v-if="features.length"
        class="padding-top-half padding-bottom-half border-top"
      >
        <p class="fz--2 margin-0">{{ updatedAt }}</p>
      </div>
    </aside>

    <!-- Expand side panel button -->
    <div
      v-if="
        !$store.state.is_side_panel_expanded &&
          ['xs', 's'].includes($store.state.screen_size)
      "
      :class="{
        lower: metric.show_bivariate_maps,
        higher: this.$router.currentRoute.query.view === 'table',
      }"
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
// App Components
import FeatureList from "./FeatureList.vue";
import FeatureDetails from "./FeatureDetails.vue";
import Charts from "./Charts.vue";

// Mixins
import routeMixins from "@/routeMixins.js";

export default {
  name: "SidePanel",
  mixins: [routeMixins],
  components: { FeatureList, Charts, FeatureDetails },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    updatedAt() {
      const months = [
        "January",
        "February",
        "March",
        "March",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      if (!this.$store.state.updated_at) {
        return "...";
      }
      const today = new Date(this.$store.state.updated_at);
      const dataMonth = months[today.getMonth() - 1];
      const year = today.getFullYear();
      const dataYear = today.getMonth() === 0 ? year - 1 : year;
      return `Showing data for ${dataMonth} ${dataYear}.  Updated ${today.toLocaleDateString()}.`;
      // return `Showing data for March 2021.  Updated ${today.toLocaleDateString()}.`;
    },
  },
  methods: {
    viewChart(chart) {
      if (this.$store.state.screen_size !== "xs" && chart !== "forecast") {
        this.$store.commit("toggleModal", chart);
      } else {
        window.open(this[`${chart}Src`], "_blank").focus();
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

<style lang="scss">
.app-side-panel {
  box-sizing: border-box;
  height: calc(100vh - 55px);
  width: 360px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-right: 1px solid var(--calcite-ui-border-1);
  &.xs {
    width: 100%;
    height: calc(100vh - 43px);
  }
}

.back-btn {
  font-size: 12px;
  color: var(--calcite-ui-text-1);
  opacity: 0.6;
  transition: 0.2s;
  text-decoration: none;
  padding-bottom: 2px;
  display: inline-flex;
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
  &.higher {
    top: 10px;
  }
}

.side-panel-lower {
  flex: 1;
  .esri-widget__heading {
    display: none;
  }
}

.z-1 {
  /* z-index: 1; */
}

.border-top {
  border-top: 1px solid var(--calcite-ui-border-3);
}
</style>

