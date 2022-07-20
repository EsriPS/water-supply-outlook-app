export default {
  states: [
    {
      name: "Colorado", // Friednly name of the state
      code: "CO", // State code - needs to be all caps
      state_huc_code: "co3", // State huc code defined by NWCC
      basin_huc_code: "co_8", // State basin huc code defined by NWCC
      center: [-107, 39], // Center point of the state on the map
      zoom: 6 // Map zoom level (zoom out for large states)
    },
    {
      name: "Montana",
      code: "MT",
      state_huc_code: "",
      basin_huc_code: "mt_8",
      center: [-110, 46.5],
      zoom: 5
    },
    {
      name: "Nevada",
      code: "NV",
      state_huc_code: "nv3",
      basin_huc_code: "nv_8",
      center: [-117.5, 39],
      zoom: 6
    },
    {
      name: "Utah",
      code: "UT",
      state_huc_code: "ut3",
      basin_huc_code: "ut_8",
      center: [-112, 39.8],
      zoom: 6
    }
  ],

  // ArcGIS Online ID of the basins feature layer. This is used
  // to query for all of the basin data.
  basins_feature_layer_id: "2b3d9f10da71484d8adf1b53a69cdb6d",

  // URL of the experience builder table used to render the
  // basins and stations tables
  feature_table_id: "a93041749042446fb47f44235884960f",

  // Base url to open the metric trends chart for the state / basin.
  trends_base_url:
    "https://www.nrcs.usda.gov/Internet/WCIS/AWS_PLOTS/basinCharts/POR",

  // Base url to open the precipitation forecast charts for a basin
  forecast_base_url:
    "https://www.wcc.nrcs.usda.gov/ftpref/support/forecast_charts",

  // HTML template for basin attributes
  detailTemplates: [
    `<div class="demi">Precipitation</div> Precipitation is {label_PREC} at {prec_ytd_curr_per_med}% of median compared to {prec_ytd_ly_per_med}% last year.`,
    `<div class="demi margin-top-half">Snow Water Equivalent</div> Snowpack is {label_WTEQ} at {wteq_curr_per_med}% of median compared to {wteq_ly_per_med}% last year.`,
    `<div class="demi  margin-top-half">Reservoir Capacity</div> The reservoir storage is {label_RESC} at {res_curr_per_med}% of median compared to {res_ly_per_med}% last year.`
  ],
  metrics: [
    {
      // Metric name
      name: "Precipitation",

      // Metric name abbreviation
      abvr: "Prec.",

      // Metric code
      code: "PREC",

      // Feature type the metric applies to
      featureType: "basins",

      // Does the metric map use bivariate layers
      show_bivariate_maps: false,

      // ArcGIS Online ID of the metric map
      map_id: "accceb598c0d44c3aa31d4ed37adc053",

      // Effects to apply to selected feature
      includedEffect: "drop-shadow(0px, 0px, 8px, #000000)",

      // Effect to apply to non selected feature
      excludedEffect: "opacity(0.75)",

      // Effect to apply to all feature when there is no selected feature
      baseEffect: "drop-shadow(0px, 0px, 0px) opacity(1)",

      // Class breaks used by Map (these are auto updated when the maps load)
      classBreaks: [
        {
          min: 0,
          max: 50,
          color: { r: 250, g: 239, b: 219, a: 1 }
        },
        {
          min: 50,
          max: 70,
          color: { r: 219, g: 210, b: 192, a: 1 }
        },
        {
          min: 70,
          max: 90,
          color: { r: 188, g: 180, b: 166, a: 1 }
        },
        {
          min: 90,
          max: 110,
          color: { r: 110, g: 141, b: 153, a: 1 }
        },
        {
          min: 110,
          max: 130,
          color: { r: 46, g: 133, b: 156, a: 1 }
        },
        {
          min: 130,
          max: 150,
          color: { r: 49, g: 100, b: 117, a: 1 }
        },
        {
          min: 150,
          max: 200,
          color: { r: 50, g: 83, b: 97, a: 1 }
        }
      ],
      charts: [
        {
          code: "prec_ytd_curr_per_med",
          title: "Precipitation % Median ({year} YTD)",
          unit: "%",
          color: "#4f8191",
          secondary_color: "#315361",
          range: [0, 100],
          threshold: 100
        },
        {
          code: "prec_mnth_curr_per_med",
          title: "Precipitation % Median ({month} {year})",
          unit: "%",
          color: "#4f8191",
          secondary_color: "#315361",
          range: [0, 100],
          threshold: 100
        }
      ]
    },
    {
      name: "Snow Water Equivalent",
      code: "WTEQ",
      abvr: "SWE",
      featureType: "basins",
      map_id: "01379f3805034e4380d606639d552464",
      includedEffect: "drop-shadow(0px, 0px, 8px, #000000)",
      excludedEffect: "opacity(0.75)",
      baseEffect: "drop-shadow(0px, 0px, 0px) opacity(1)",
      classBreaks: [
        {
          min: 0,
          max: 50,
          color: { r: 239, g: 243, b: 255, a: 1 }
        },
        {
          min: 50,
          max: 70,
          color: { r: 198, g: 219, b: 239, a: 1 }
        },
        {
          min: 70,
          max: 90,
          color: { r: 158, g: 202, b: 225, a: 1 }
        },
        {
          min: 90,
          max: 110,
          color: { r: 107, g: 174, b: 214, a: 1 }
        },
        {
          min: 110,
          max: 130,
          color: { r: 66, g: 146, b: 198, a: 1 }
        },
        {
          min: 130,
          max: 150,
          color: { r: 33, g: 113, b: 181, a: 1 }
        },
        {
          min: 150,
          max: 271.4,
          color: { r: 8, g: 69, b: 148, a: 1 }
        }
      ],
      charts: [
        {
          code: "wteq_curr_per_med",
          title: "Snow Water Equivalent % Median ({month} {year})",
          unit: "%",
          color: "#519bcb",
          secondary_color: "#09519c",
          range: [0, 100],
          threshold: 100
        },
        {
          code: "wteq_ly_per_med",
          title: "Snow Water Equivalent % Median ({month} {ly})",
          unit: "%",
          color: "#519bcb",
          secondary_color: "#09519c",
          range: [0, 100],
          threshold: 100
        }
      ]
    },
    {
      name: "Reservoir Capacity",
      abvr: "Res.",
      code: "RESC",
      featureType: "reservoirs",
      map_id: "01259608055e46f2be5aaa99b141291c",
      includedEffect: "drop-shadow(0px, 0px, 8px, #000000)",
      excludedEffect: "opacity(0.75)",
      baseEffect: "drop-shadow(0px, 0px, 0px) opacity(1)",
      classBreaks: [
        {
          min: 0,
          max: 50,
          color: { r: 240, g: 227, b: 211, a: 1 }
        },
        {
          min: 50,
          max: 70,
          color: { r: 230, g: 210, b: 190, a: 1 }
        },
        {
          min: 70,
          max: 90,
          color: { r: 219, g: 179, b: 149, a: 1 }
        },
        {
          min: 90,
          max: 110,
          color: { r: 169, g: 188, b: 204, a: 1 }
        },
        {
          min: 110,
          max: 130,
          color: { r: 125, g: 154, b: 179, a: 1 }
        },
        {
          min: 130,
          max: 150,
          color: { r: 96, g: 127, b: 153, a: 1 }
        },
        {
          min: 150,
          max: 270,
          color: { r: 67, g: 100, b: 128, a: 1 }
        }
      ],
      charts: [
        {
          code: "res_curr_per_med",
          title: "Reservoir % Median ({month} {year})",
          unit: "%",
          color: "#7d9ab3",
          secondary_color: "#436480",
          range: [0, 100],
          threshold: 100
        },
        {
          code: "res_ly_per_med",
          title: "Reservoir % Median ({month} {ly})",
          unit: "%",
          color: "#7d9ab3",
          secondary_color: "#436480",
          range: [0, 100],
          threshold: 100
        }
      ]
    }
  ]
};
