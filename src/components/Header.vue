<!--

Header.vue  handles the following tasks:
  - Changing the State 
  - Changing the Metric (map)
  - Linking to the pdf WSORs

-->

<template>
  <header
    class="app-header space-between padding-top-half padding-bottom-half"
    :class="{
      'padding-right-2 padding-left-2': $store.state.screen_size === 'm',
      'padding-right-half padding-left-half': $store.state.screen_size !== 'm',
    }"
  >
    <!-- Logo and Title -->
    <div v-if="$store.state.screen_size === 'm'" class="flex align-center">
      <img
        v-if="!$route.query.embedded"
        class="header-logo margin-right-half"
        src="@/assets/nrcs-logo.png"
      />
      <div>
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
    <div
      v-if="$store.getters.state && $store.getters.metric"
      class="align-center"
      :class="{ 'full-width space-between': $store.state.screen_size !== 'm' }"
    >
      <div
        class="margin-right-1 padding-right-1 align-center"
        :class="{ 'header-button-group': $store.state.screen_size == 'm' }"
      >
        <!-- View Toggle -->
        <calcite-radio-group
          scale="s"
          appearance="outline"
          class="margin-right-1"
        >
          <calcite-radio-group-item
            v-for="view in $store.state.views"
            :key="view"
            :value="view"
            :checked="$store.getters.view === view"
            @click="$store.commit('view', view)"
            class="capitalize"
          >
            {{ view }}
          </calcite-radio-group-item>
        </calcite-radio-group>

        <!-- State Toggle -->
        <div class="align-center margin-right-half">
          <span class="fz--2 margin-right-quarter">State:</span>
          <calcite-dropdown placement="bottom-trailing">
            <calcite-button
              slot="dropdown-trigger"
              appearance="clear"
              scale="s"
              icon-end="chevron-down"
            >
              {{
                $store.state.screen_size === "xs"
                  ? shortenString($store.getters.state.name)
                  : $store.getters.state.name
              }}
            </calcite-button>
            <calcite-dropdown-group
              selection-mode="single"
              role="menu"
              group-title="Select State"
            >
              <calcite-dropdown-item
                v-for="state in $store.state.states"
                :key="state.name"
                :disabled="$store.state.status === 'PENDING'"
                :active="$store.getters.state.name === state.name"
                @click="$store.commit('state', state)"
              >
                {{ state.name }}
              </calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>

        <!-- Metric Toggle -->
        <div class="align-center">
          <span class="fz--2 margin-right-quarter">Metric:</span>
          <calcite-dropdown placement="bottom-trailing">
            <calcite-button
              slot="dropdown-trigger"
              appearance="clear"
              scale="s"
              icon-end="chevron-down"
            >
              {{
                $store.state.screen_size === "xs"
                  ? shortenString($store.getters.metric.name)
                  : $store.getters.metric.name
              }}
            </calcite-button>
            <calcite-dropdown-group
              selection-mode="single"
              role="menu"
              group-title="Select Map"
            >
              <calcite-dropdown-item
                v-for="metric in $store.state.metrics"
                :key="metric.name"
                :disabled="$store.state.status === 'PENDING'"
                :active="$store.getters.metric.name === metric.name"
                @click="$store.commit('metric', metric)"
              >
                {{ metric.name }}
              </calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        </div>
      </div>

      <!-- Download Btn -->
      <calcite-button
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
      />
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
  methods: {
    downloadReport() {
      window.open(this.$store.getters.state.link_to_download_reports, "_blank");
    },
    shortenString(string) {
      const length = 13;
      return `${string.substring(0, length)}${
        string.length > length ? "..." : ""
      }`;
    },
  },
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
