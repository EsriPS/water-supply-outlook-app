<template>
  <calcite-modal
    :active="active"
    @calciteModalClose="onClose()"
    background-color="white"
    width="l"
  >
    <iframe
      slot="content"
      :src="$store.state.chart"
      title="Chart Title"
      class="modal-chart"
    />
  </calcite-modal>
</template>

<script>
export default {
  name: "AddEditComment",
  components: {},
  props: {},
  data: function() {
    return {
      active: true
    };
  },
  methods: {
    async onClose() {
      this.active = false;
      await new Promise(resolve => setTimeout(resolve, 200));
      this.$store.commit("clearChart");
    }
  }
};
</script>
<style lang="scss" scoped>
.modal-chart {
  width: 100%;
  height: 99%;
  min-height: 650px;
  border: none;
}
</style>
