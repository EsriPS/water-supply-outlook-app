<template>
  <div class="full-width">
    <div
      v-for="(chart, index) in $store.getters.view.charts"
      :key="index"
      :id="`echart-${index}`"
      class="echart"
      :class="{ xs: $store.state.screen_size === 'xs' }"
    />
  </div>
</template>

<script>
export default {
  name: "Charts",
  components: {},
  props: {},
  data() {
    return {
      charts: [],
    };
  },
  watch: {
    "$store.getters.feature": {
      deep: true,
      handler() {
        this.renderCharts();
      },
    },
    "$store.getters.view": {
      deep: true,
      handler() {
        this.renderCharts();
      },
    },
    "$store.state.screen_size": {
      handler() {
        this.setCharts();
        this.renderCharts();
      },
    },
  },
  computed: {},
  methods: {
    setCharts() {
      this.charts = [];
      this.$store.getters.view.charts.forEach((chart, index) => {
        // Get the elment to render the chart in.
        let chartElement;
        while (!chartElement) {
          chartElement = document.getElementById(`echart-${index}`);
        }
        // Creat new chart
        this.charts.push(this.$echarts.init(chartElement));
      });
    },
    renderCharts() {
      this.$store.getters.view.charts.forEach((chart, index) => {
        const value = this.$store.getters.feature
          ? this.$store.getters.feature.attributes[chart.code]
          : this.$store.state.features[0].attributes[`state_${chart.code}`];

        const color =
          chart.type == "difference" && value <= 0
            ? chart.secondary_color
            : chart.color;

        const secondaryColor =
          chart.type == "difference" ? "#E6EBF8" : chart.secondary_color;

        // Specify chart configuration item and data
        const option = {
          title: {
            text: chart.title,
            textStyle: {
              fontWeight: "normal",
              color: "#949494",
              fontSize: 12,
            },
          },
          color: [color, secondaryColor],
          series: [
            {
              type: "gauge",
              center: [
                "57%",
                this.$store.state.screen_size === "xs" ? "40%" : "34%",
              ],
              startAngle: 180,
              endAngle: 0,
              min: chart.range[0],
              max: chart.range[1],
              splitNumber: 5,

              progress: {
                show: true,
                width: 10,
              },
              pointer: {
                show: false,
              },
              axisLine: {
                lineStyle: {
                  width: 10,
                },
              },
              axisTick: {
                splitNumber: 2,
                lineStyle: {
                  width: 1,
                  color: "#6a6a6a",
                },
              },
              splitLine: {
                length: 8,
                lineStyle: {
                  width: 2,
                  color: "#6a6a6a",
                },
              },
              axisLabel: {
                distance: 15,
                color: "#6a6a6a",
                fontSize: 10,
              },
              title: {
                show: false,
              },
              detail: {
                width: "60%",
                lineHeight: 40,
                height: 40,
                offsetCenter: [0, -10],
                valueAnimation: true,
                formatter(value) {
                  return `{value|${
                    chart.type == "difference" && value > 0 ? "+" : ""
                  }${value}}{unit|${chart.unit}}`;
                },
                rich: {
                  value: {
                    fontSize: 30,
                    fontWeight: "bolder",
                    color:
                      value > chart.range[1] && chart.type !== "difference"
                        ? secondaryColor
                        : color,
                  },
                  unit: {
                    fontSize: 15,
                    color: value > chart.range[1] ? secondaryColor : color,
                    padding: [0, 0, -8, 5],
                  },
                },
              },
              data: [
                // If chart is difference between 2 values and negative
                ...(chart.type == "difference" && value <= 0
                  ? [
                      {
                        value: 0,
                        detail: {
                          show: false,
                        },
                      },
                    ]
                  : []),
                {
                  value,
                },
                // If chart is difference between 2 values and positive
                ...(chart.type == "difference" && value > 0
                  ? [
                      {
                        value: 0,
                        detail: {
                          show: false,
                        },
                      },
                    ]
                  : []),
                // If Value exceeds chart range
                ...(value > chart.range[1] && chart.type !== "difference"
                  ? [
                      {
                        value: value - chart.range[1],
                        detail: {
                          show: false,
                        },
                      },
                    ]
                  : []),
              ],
            },
          ],
        };
        // use configuration item and data specified to show chart
        this.charts[index].setOption(option);
      });
    },
  },
  mounted() {
    if (!this.charts.length) {
      this.setCharts();
    }
    this.renderCharts();
  },
};
</script>

<style lang="scss" scoped>
.echart {
  z-index: 0;
  width: calc(90% + 0.25rem);
  height: 400px;
  margin: -20px -1rem -240px -0.25rem;
  &.xs {
    margin-bottom: -220px;
  }
}
</style>
