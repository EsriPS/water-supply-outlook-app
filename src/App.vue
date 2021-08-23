<template>
  <div id="app" class="app-content">
    <Header />
    <ChartModal v-if="$store.state.chart" />
    <main class="app-main">
      <!-- Loading State -->
      <transition name="fade" mode="out-in">
        <div
          v-if="this.$store.state.status == 'PENDING'"
          class="align-center load-initial"
        >
          <calcite-loader active="" type="indeterminate" />
        </div>
      </transition>
      <SidePanel v-if="this.$store.state.status == 'OK'" />
      <Map />
    </main>
  </div>
</template>

<script>
// App Components
import Header from "@/components/Header.vue";
import SidePanel from "@/components/SidePanel.vue";
import Map from "@/components/Map.vue";
import ChartModal from "@/components/ChartModal.vue";

// Utils

export default {
  name: "App",
  components: { Header, SidePanel, Map, ChartModal },
  data() {
    return {
      isInitialized: false
    };
  },
  methods: {
    async loadData() {
      const topology = await this.$api.info.basins.getBasins();
      console.log(
        topology.objects.hucall_simplified.geometries.map(
          g => g.properties.name
        )
      );
    }
  },
  beforeMount() {
    this.loadData();
  }
};
</script>

<style lang="scss">
@import "@/styles/styles.scss";
.app-content {
  height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.app-main {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.load-initial {
  z-index: 1;
  width: 100%;
  height: calc(100% - 60px);
  position: absolute;
  background: var(--calcite-ui-foreground-1);
}
</style>
