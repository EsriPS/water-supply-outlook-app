<!--

Charts.vue handles the following tasks:
  - EChart configuration and rendering

-->

<template>
  <div
    class="full-width echart-container"
    :class="{ xs: $store.state.screen_size === 'xs' }"
  >
    <div
      v-for="(chart, index) in metric.charts"
      v-show="!showNoData"
      :key="index"
      :id="`echart-${index}`"
      class="echart"
      :class="{ xs: $store.state.screen_size === 'xs' }"
    />
    <p
      v-if="showNoData"
      class="fz-1 text-light align-center justify-center padding-top-3 padding-bottom-3"
    >
      No Data
    </p>
  </div>
</template>

<script>
// Mixins
import routeMixins from "@/routeMixins.js";

export default {
  name: "Charts",
  mixins: [routeMixins],
  components: {},
  props: {},
  data() {
    return {
      charts: [],
      showNoData: false
    };
  },
  watch: {
    feature: {
      deep: true,
      handler() {
        this.renderCharts();
      }
    },
    metric: {
      deep: true,
      handler() {
        this.renderCharts();
      }
    },
    state: {
      deep: true,
      handler() {
        this.renderCharts();
      }
    }
  },
  computed: {
    size() {
      return this.$store.state.screen_size;
    }
  },
  methods: {
    setCharts() {
      this.charts = [];
      this.metric.charts.forEach((chart, index) => {
        // Get the elment to render the chart in.
        let chartElement;
        while (!chartElement) {
          chartElement = document.getElementById(`echart-${index}`);
        }
        // Create new chart
        this.charts.push(this.$echarts.init(chartElement));
      });
    },
    renderCharts() {
      this.metric.charts.forEach((chart, index) => {
        const value = this.feature
          ? this.feature?.attributes[chart.code]
          : this.features?.[0]?.attributes?.[`${chart.code}_state`];

        // Handle 'None' values
        this.showNoData = !value && value != 0;

        const color =
          chart.type == "difference" && value <= 0
            ? chart.secondary_color
            : chart.color;

        const secondaryColor =
          chart.type == "difference" ? "#E6EBF8" : chart.secondary_color;

        // Specify chart configuration item and data
        const option = {
          title: {
            text: chart.title
              .replace("{month}", this.$store.state.month)
              .replace("{year}", this.$store.state.year)
              .replace("{ly}", this.$store.state.year - 1),
            textStyle: {
              fontWeight: "normal",
              color: "#949494",
              fontSize: this.size === "xs" ? 8 : 12
            }
          },
          color: [color, secondaryColor],
          series: [
            {
              type: "gauge",
              center: this.size === "xs" ? ["49%", "48%"] : ["56%", "34%"],
              startAngle: 180,
              endAngle: 0,
              min: chart.range[0],
              max: chart.range[1],
              splitNumber: 5,

              progress: {
                show: true,
                width: this.size === "xs" ? 6 : 10
              },
              pointer: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  width: this.size === "xs" ? 6 : 10
                }
              },
              axisTick: {
                distance: this.size === "xs" ? 2 : 8,
                splitNumber: 2,
                lineStyle: {
                  width: 1,
                  color: "#6a6a6a"
                }
              },
              splitLine: {
                distance: this.size === "xs" ? 2 : 8,
                length: this.size === "xs" ? 6 : 8,
                lineStyle: {
                  width: 2,
                  color: "#6a6a6a"
                }
              },
              axisLabel: {
                distance: this.size === "xs" ? 8 : 15,
                color: "#6a6a6a",
                fontSize: this.size === "xs" ? 8 : 10
              },
              title: {
                show: false
              },
              detail: {
                width: "60%",
                lineHeight: 40,
                height: 40,
                offsetCenter: [0, this.size === "xs" ? -4 : -10],
                valueAnimation: true,
                formatter(value) {
                  return `{value|${
                    chart.type == "difference" && value > 0 ? "+" : ""
                  }${value}}{unit|${chart.unit}}`;
                },
                rich: {
                  value: {
                    fontSize: this.size === "xs" ? 20 : 30,
                    fontWeight: "bolder",
                    color:
                      value > chart.range[1] && chart.type !== "difference"
                        ? secondaryColor
                        : color
                  },
                  unit: {
                    fontSize: this.size === "xs" ? 10 : 15,
                    color: value > chart.range[1] ? secondaryColor : color,
                    padding: [0, 0, this.size === "xs" ? -4 : -8, 5]
                  }
                }
              },
              data: [
                // If chart is difference between 2 values and negative
                ...(chart.type == "difference" && value <= 0
                  ? [
                      {
                        value: 0,
                        detail: {
                          show: false
                        }
                      }
                    ]
                  : []),
                {
                  value
                },
                // If chart is difference between 2 values and positive
                ...(chart.type == "difference" && value > 0
                  ? [
                      {
                        value: 0,
                        detail: {
                          show: false
                        }
                      }
                    ]
                  : []),
                // If Value exceeds chart range
                ...(value > chart.threshold && chart.type !== "difference"
                  ? [
                      {
                        value: value - chart.range[1],
                        detail: {
                          show: false
                        }
                      }
                    ]
                  : [])
              ]
            }
          ]
        };
        // use configuration item and data specified to show chart
        this.charts[index].setOption(option);
      });
    }
  },
  mounted() {
    if (!this.charts.length) {
      this.setCharts();
    }
    this.renderCharts();
  }
};
</script>

<style lang="scss" scoped>
.echart-container {
  margin: 0 -1rem 0px -0.25rem;
  width: calc(100% + 1.25rem);
  &.xs {
    display: flex;
    margin: 0 -0.5rem 0px -0.25rem;
    width: calc(100% + 0.75rem);
  }
}
.echart {
  z-index: 0;
  width: 85%;
  height: 420px;
  margin: -20px 0 -240px 0;
  &.xs {
    width: 50%;
    height: 200px;
    margin: -16px 0 -84px 0;
  }
}
</style>
