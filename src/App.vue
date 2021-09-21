<template>
  <div id="app" class="app-content" :class="{embedded: $route.query.embedded}">
    <Header />
    <TrendsModal v-if="$store.state.modals.trends" />
    <ForecastModal v-if="$store.state.modals.forecast" />
    <main class="app-main">
      <!-- Loading State -->
      <transition name="fade" mode="out-in">
        <div
          v-if="this.$store.state.status == 'PENDING' || !isInitialized"
          class="align-center load-initial"
          :class="{ xs: $store.state.screen_size === 'xs' }"
        >
          <calcite-loader active="" type="indeterminate" />
        </div>
      </transition>
      <SidePanel v-if="this.$store.state.status == 'OK' && isInitialized" />
      <Map v-if="isInitialized" />
    </main>
  </div>
</template>

<script>
// App Components
import Header from "@/components/Header.vue";
import SidePanel from "@/components/SidePanel.vue";
import Map from "@/components/Map.vue";
import TrendsModal from "@/components/modals/Trends.vue";
import ForecastModal from "@/components/modals/Forecast.vue";

// Utils
import CONFIG from "@/config.json";

export default {
  name: "App",
  components: { Header, SidePanel, Map, TrendsModal, ForecastModal },
  computed: {
    isInitialized() {
      return this.$route.query.state && this.$route.query.view;
    },
  },
  methods: {
    screenSizeHandler(width) {
      let size;
      switch (true) {
        case width <= 600:
          size = "xs";
          break;
        case width <= 1050:
          size = "s";
          break;
        default:
          size = "m";
          break;
      }
      this.$store.commit("screenSize", size);
    },
  },
  async beforeMount() {
    await this.$store.commit("config", CONFIG);
    if (!this.$route.query.state) {
      await this.$store.commit("state", this.$store.state.states[0]);
    }
    if (!this.$route.query.view) {
      await this.$store.commit("view", this.$store.state.views[0]);
    }
  },
  created() {
    window.addEventListener("resize", (e) =>
      this.screenSizeHandler(e.target.innerWidth)
    );
    this.screenSizeHandler(window.innerWidth);
  },

  destroyed() {
    window.removeEventListener("resize", this.screenSizeHandler);
  },
};
</script>

<style lang="scss">
@import "@/styles/styles.scss";
.app-content {
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #fff;
  &.embedded {
    border: 1px solid var(--calcite-ui-border-2);
  }
}

.app-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.load-initial {
  z-index: 1;
  width: 100%;
  height: calc(100% - 55px);
  position: absolute;
  background: var(--calcite-ui-foreground-1);
  &.xs {
    height: calc(100% - 43px);
  }
}
</style>
