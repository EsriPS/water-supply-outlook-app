<!--

FeatureDetails.vue handles the following tasks:
  - Calculating the feature details paragraphs
  - Rendering the feature details paragraphs

-->

<template>
  <p
    v-html="details"
    class="fz--2 details-paragraph"
    :class="{
      'fz--1': $store.state.screen_size == 'xs',
    }"
  />
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
      const labels = {};

      // Handle class breaks
      this.$store.state.metrics.forEach((metric) => {
        const field = metric.charts[0]?.code;
        const value = feature.attributes[field];
        if (metric.classBreaks?.length) {
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

        // Handle "TAVG" which doesn't utilize class breaks
        if (metric.code === "TAVG") {
          const colorRef = value >= 0 ? "color" : "secondary_color";
          const label = value >= 0 ? "Warmer" : "Colder";
          const rgb = this.getRGBfromHex(metric.charts[0][colorRef]);
          const backgroundColor = this.getRGB(rgb);
          const color = this.getTextColor(rgb);
          labels.label_TAVG = `<span class="details-label" style="background-color: ${backgroundColor}; color: ${color};">${label}</span>`;
          labels.TAVG_value = Math.abs(value);
        }
      });

      // Replace all text wrapped in curly brackets with
      // calculated values
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
    // Format the rgb value to use in CSS
    getRGB({ r, g, b }) {
      return `rgb(${r},${g},${b})`;
    },

    // Get text color based on luminosity of background
    getTextColor(color) {
      const luminosity = this.getLuminosity(color);
      return luminosity < 175 ? "#fff" : "#000";
    },

    // Get lumin value from rgb
    getLuminosity({ r, g, b }) {
      return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    },

    // Convert a hex color into rgb
    getRGBfromHex(hex) {
      let color = hex[0] === "#" ? hex.substring(1) : hex; // strip #
      const rgb = parseInt(color, 16); // convert rrggbb to decimal
      const r = (rgb >> 16) & 0xff; // extract red
      const g = (rgb >> 8) & 0xff; // extract green
      const b = (rgb >> 0) & 0xff; // extract blue
      return { r, g, b };
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

