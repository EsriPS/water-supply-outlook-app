<!--

FeatureDetails.vue 

-->

<template>
  <p v-html="details" class="fz--1 details-paragraph" />
</template>

<script>
// Mixins
import routeMixins from "@/routeMixins.js";

export default {
  name: "FeatureDetails",
  mixins: [routeMixins],
  components: {},
  props: {},
  data() {
    return {
      labels: [
        " Greatly Below Median",
        " Well Below Median",
        " Below Median",
        " Near Median",
        " Above Median",
        " Well Above Median",
        " Greatly Above Median",
      ],
    };
  },
  watch: {},
  computed: {
    details() {
      const { feature } = this;

      // Wait for classBreaks if map uses classBreaks
      // if (this.metric.classBreaks && !this.metric.classBreaks.length) {
      //   return "";
      // }

      const labels = {};

      // Handle class breaks
      this.$store.state.metrics.forEach((metric) => {
        if (metric.classBreaks?.length) {
          const field = metric.charts[0].code;
          const value = feature.attributes[field];
          const classBreak = metric.classBreaks.find(
            (c) => value >= c.min && value < c.max
          );
          const index = metric?.classBreaks
            ?.map((c) => c.min)
            ?.indexOf(classBreak.min);
          const backgroundColor = this.getRGB(classBreak?.color);
          const color = this.getTextColor(classBreak?.color);
          labels[
            `label_${metric.code}`
          ] = `<span class="details-label" style="background-color: ${backgroundColor}; color: ${color};">${this.labels[index]}</span>`;
        }
      });

      const details = this.$store.state.detailsTemplate.replace(
        /{(\w*)}/g,
        (m, key) => {
          return labels[key] || feature.attributes[key];
        }
      );
      return details;
    },
  },
  methods: {
    getRGB({ r, g, b }) {
      return `rgb(${r},${g},${b})`;
    },
    getTextColor(color) {
      const luminosity = this.getLuminosity(color);
      return luminosity < 175 ? "#fff" : "#000";
    },
    getLuminosity({ r, g, b }) {
      return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    },
  },
};
</script>

<style lang="scss">
.details-paragraph {
  line-height: 1.5;
  margin-top: 0;
}
.details-label {
  white-space: nowrap;
  font-weight: 400;
  padding: 0px 3px;
  border-radius: 3px;
}
</style>
