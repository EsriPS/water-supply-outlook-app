export default {
  basins_feature_layer_id: "af31379f9a5948288da968e60c37971e",
  reservoirs_feature_layer_id: "cd492381da0047b0a047fb50b21bac65",
  trends_base_url:
    "https://www.nrcs.usda.gov/Internet/WCIS/AWS_PLOTS/basinCharts/POR",
  forecast_base_url:
    "https://www.wcc.nrcs.usda.gov/ftpref/support/forecast_charts",
  detailsTemplate: `
  <div class="demi">Precipitation</div>
  Precipitation is {label_PREC} at {PREC_year_to_date_as_percent_median}% of median compared to {PREC_yago_year_to_date_as_percent_median}% last year.
  <div class="demi margin-top-half">Snow Water Equivalent</div>
  Snowpack is {label_WTEQ} at {WTEQ_year_to_date_as_percent_median}% of median compared to {WTEQ_yago_year_to_date_as_percent_median}% last year. 
  <div class="demi  margin-top-half">Temperature</div>
  The average temperature over the past month was {TAVG_value} °F {label_TAVG} than the POR meidan at {TAVG_current_month} °F.
  <div class="demi  margin-top-half">Soil Moisture</div>
  Soil moisture is at {SMS_year_to_date}% compared to {SMS_yago_year_to_date}% last year. 
  `,
  metrics: [
    {
      name: "Precipitation",
      code: "PREC",
      featureType: "basins",
      show_bivariate_maps: true,
      map_id: "7ea569cac98c4ae4b09062e4f4044a10",
      includedEffect: "drop-shadow(0px, 0px, 8px, #000000)",
      excludedEffect: "opacity(0.75)",
      baseEffect: "drop-shadow(0px, 0px, 0px) opacity(1)",
      classBreaks: [
        {
          min: 0,
          max: 50,
          color: { r: 250, g: 239, b: 219, a: 1 },
        },
        {
          min: 50,
          max: 70,
          color: { r: 219, g: 210, b: 192, a: 1 },
        },
        {
          min: 70,
          max: 90,
          color: { r: 188, g: 180, b: 166, a: 1 },
        },
        {
          min: 90,
          max: 110,
          color: { r: 110, g: 141, b: 153, a: 1 },
        },
        {
          min: 110,
          max: 130,
          color: { r: 46, g: 133, b: 156, a: 1 },
        },
        {
          min: 130,
          max: 150,
          color: { r: 49, g: 100, b: 117, a: 1 },
        },
        {
          min: 150,
          max: 200,
          color: { r: 50, g: 83, b: 97, a: 1 },
        },
      ],
      charts: [
        {
          code: "PREC_year_to_date_as_percent_median",
          title: "Precipitation as Percent Median (YTD)",
          unit: "%",
          color: "#4f8191",
          secondary_color: "#315361",
          range: [0, 100],
          threshold: 100,
        },
        {
          code: "PREC_change_as_percent_median",
          title: "Change Since Last Month as Percent Median",
          unit: "%",
          color: "#4f8191",
          secondary_color: "#315361",
          range: [0, 100],
          threshold: 100,
        },
      ],
    },
    {
      name: "Snow Water Equivalent",
      code: "WTEQ",
      featureType: "basins",
      map_id: "285bbae8c43542a597febb8c3fd513b5",
      includedEffect: "drop-shadow(0px, 0px, 8px, #000000)",
      excludedEffect: "opacity(0.75)",
      baseEffect: "drop-shadow(0px, 0px, 0px) opacity(1)",
      classBreaks: [
        {
          min: 0,
          max: 50,
          color: { r: 239, g: 243, b: 255, a: 1 },
        },
        {
          min: 50,
          max: 70,
          color: { r: 198, g: 219, b: 239, a: 1 },
        },
        {
          min: 70,
          max: 90,
          color: { r: 158, g: 202, b: 225, a: 1 },
        },
        {
          min: 90,
          max: 110,
          color: { r: 107, g: 174, b: 214, a: 1 },
        },
        {
          min: 110,
          max: 130,
          color: { r: 66, g: 146, b: 198, a: 1 },
        },
        {
          min: 130,
          max: 150,
          color: { r: 33, g: 113, b: 181, a: 1 },
        },
        {
          min: 150,
          max: 271.4,
          color: { r: 8, g: 69, b: 148, a: 1 },
        },
      ],
      charts: [
        {
          code: "WTEQ_year_to_date_as_percent_median",
          title: "Snow Water Equivalent as Percent Median",
          unit: "%",
          color: "#519bcb",
          secondary_color: "#09519c",
          range: [0, 100],
          threshold: 100,
        },
        {
          code: "WTEQ_change_as_percent_median",
          title: "Change Since Last Month as Percent Median",
          unit: "%",
          color: "#FC9D58",
          secondary_color: "#b75534",
          range: [0, 100],
          threshold: 100,
        },
      ],
    },
    {
      name: "Temperature",
      code: "TAVG",
      featureType: "basins",
      map_id: "6a463b0235d340f9b3cae8e6f44408e8",
      includedEffect: "drop-shadow(0px, 0px, 10px, #000000)",
      excludedEffect: "opacity(0.75)",
      baseEffect: "drop-shadow(0px, 0px, 0px) opacity(1)",
      charts: [
        {
          code: "TAVG_POR_median_departure",
          title: "Monthly Avg Temp Departure from POR Median",
          unit: "°F",
          type: "difference",
          color: "#c66323",
          secondary_color: "#557b9a",
          range: [-4, 4],
        },
        {
          code: "TAVG_current_month",
          title: "Monthly Avg Temp",
          unit: "°F",
          color: "#557b9a",
          secondary_color: "#c66323",
          range: [0, 100],
          threshold: 32,
        },
      ],
    },
    {
      name: "Soil Moisture",
      code: "SMS",
      featureType: "basins",
      map_id: "bcf02d8fb96d4165a100281270f4ae36",
      includedEffect: "drop-shadow(0px, 0px, 8px, #000000)",
      excludedEffect: "opacity(0.75)",
      baseEffect: "drop-shadow(0px, 0px, 0px) opacity(1)",
      charts: [
        {
          code: "SMS_year_to_date",
          title: "Avg. Soil Moisture",
          unit: "%",
          color: "#387e43",
          secondary_color: "#387e43",
          range: [0, 100],
          threshold: 100,
        },
        {
          code: "SMS_current_month",
          title: "Change Since Last Month",
          unit: "%",
          type: "difference",
          color: "#015810",
          secondary_color: "#6f8c73",
          range: [-10, 10],
        },
      ],
    },
    {
      name: "Reservoir Capacity",
      code: "RESC",
      featureType: "reservoirs",
      map_id: "c9d4cbec4e4049b798bb5d41954ecbff",
      includedEffect: "",
      excludedEffect: "opacity(0.75)",
      baseEffect: "drop-shadow(0px, 0px, 0px) opacity(1)",
      charts: [],
    },
  ],
  states: [
    {
      name: "Colorado",
      code: "CO",
      state_huc_code: "co3",
      basin_huc_code: "co_8",
      center: [-107, 39],
      zoom: 6,
    },
    {
      name: "Utah",
      code: "UT",
      state_huc_code: "ut3",
      basin_huc_code: "ut_8",
      center: [-112, 39.8],
      zoom: 6,
    },
    {
      name: "Nevada",
      code: "NV",
      state_huc_code: "nv3",
      basin_huc_code: "nv_8",
      center: [-117.5, 39],
      zoom: 6,
    },
  ],
};
