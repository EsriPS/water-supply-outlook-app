<!--

Header.vue  handles the following tasks:
  - Changing the view (map or table)
  - Changing the State 
  - Changing the Metric (map)
  - Linking to the pdf WSORs

-->

<template>
  <header
    class="app-header space-between padding-top-half padding-bottom-half"
    :class="{
      'padding-right-2 padding-left-2': $store.state.screen_size === 'm',
      'padding-right-half padding-left-half': $store.state.screen_size !== 'm'
    }"
  >
    <!-- Logo and Title -->
    <div class="flex align-center">
      <img
        v-if="!embedded"
        class="header-logo margin-right-half"
        src="@/assets/nrcs-logo.png"
      />
      <div v-if="$store.state.screen_size === 'm'">
        <h1 class="margin-0 fz--1 margin-bottom-quarter demi">
          Water Supply Outlook App
        </h1>
        <h2
          class="margin-0 fz--2 margin-bottom-quarter text-light text-regular"
        >
          Natural Resources Conservation Service
        </h2>
      </div>
    </div>

    <!--  Header Controls -->
    <div v-if="state && metric && view" class="align-center space-between">
      <div
        class="align-center"
        :class="{ 'header-button-group': $store.state.screen_size == 'm' }"
      >
        <!-- State Toggle -->
        <!-- toggle between the state options -->
        <div
          class="align-center padding-right-quarter"
          :class="{
            'margin-right-1': $store.state.screen_size !== 'xs'
          }"
        >
          <span class="fz--2 margin-right-quarter">State:</span>
          <calcite-dropdown placement="bottom-trailing">
            <calcite-button
              slot="dropdown-trigger"
              appearance="transparent"
              scale="s"
              icon-end="chevron-down"
            >
              {{ $store.state.screen_size === "xs" ? state.code : state.name }}
            </calcite-button>
            <calcite-dropdown-group
              selection-mode="single"
              role="menu"
              group-title="Select a State"
            >
              <calcite-dropdown-item
                v-for="stateOption in $store.state.states"
                :key="stateOption.name"
                :disabled="$store.state.status === 'PENDING'"
                :active="stateOption.name === state.name"
                @click="updateState(stateOption)"
              >
                {{ stateOption.name }}
              </calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>

        <!-- Metric Toggle -->
        <!-- toggle between the metric options -->
        <div
          class="align-center padding-right-quarter"
          :class="{
            'margin-right-half': $store.state.screen_size !== 'xs'
          }"
        >
          <span class="fz--2 margin-right-quarter">Metric:</span>
          <calcite-dropdown placement="bottom-trailing">
            <calcite-button
              slot="dropdown-trigger"
              appearance="transparent"
              scale="s"
              icon-end="chevron-down"
            >
              {{
                $store.state.screen_size === "xs" ? metric.abvr : metric.name
              }}
            </calcite-button>
            <calcite-dropdown-group
              selection-mode="single"
              role="menu"
              group-title="Select a Metric"
            >
              <calcite-dropdown-item
                v-for="metricOption in metrics"
                :key="metricOption.name"
                :disabled="$store.state.status === 'PENDING'"
                :active="metricOption.name === metric.name"
                @click="updateMetric(metricOption)"
              >
                {{ metricOption.name }}
              </calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>

        <!-- View Toggle -->
        <!-- toggle the view between map and table -->
        <calcite-radio-group scale="s" appearance="transparent">
          <calcite-radio-group-item
            v-for="viewOption in $store.state.views"
            :key="viewOption"
            :value="viewOption"
            :checked="viewOption === view"
            @click="updateView(viewOption)"
            class="capitalize"
          >
            {{ viewOption }}
          </calcite-radio-group-item>
        </calcite-radio-group>
      </div>

      <!-- Download Btn -->
      <!-- download the water supply outlook report from NRCS -->
      <!-- <calcite-button
        v-if="$store.state.screen_size !== 'xs'"
        scale="s"
        @click="downloadReport"
      >
        Download Monthly Report
      </calcite-button>
      <calcite-button
        v-else
        scale="s"
        icon-end="download"
        @click="downloadReport"
      /> -->
    </div>
  </header>
</template>

<script>
// Mixins
import routeMixins from "@/routeMixins.js";

export default {
  name: "Header",
  mixins: [routeMixins],
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    downloadReport() {
      window.open(this.state.link_to_download_reports, "_blank");
    },
    shortenString(string) {
      const length = 13;
      return `${string.substring(0, length)}${
        string.length > length ? "..." : ""
      }`;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-header {
  background: var(--calcite-ui-foreground-1);
  border-bottom: 1px solid var(--calcite-ui-border-1);
  z-index: 2;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
}
.header-logo {
  width: 24px;
  height: 24px;
}
</style>
