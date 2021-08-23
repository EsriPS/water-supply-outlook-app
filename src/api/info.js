export default function(get) {
  return {
    stations: {
      getMeta(
        site_id = "ALL",
        network = "ALL",
        state = "UT",
        element = "ALL",
        format = "geojson"
      ) {
        return get("/stations/getMeta", {
          site_id,
          network,
          state,
          element,
          format
        });
      }
    },
    basins: {
      getBasins(type = "ut_8", name = "ALL", id = "ALL", format = "topojson") {
        return get("/basin/getBasins", { type, name, id, format });
      }
    },
    data: {
      getBasinData(
        type = "ut_8",
        name,
        s_date,
        e_date,
        element = "PREC",
        format = "json"
      ) {
        return get("/data/getBasinDaily", {
          type,
          name,
          s_date,
          e_date,
          element,
          format
        });
      }
    }
  };
}
