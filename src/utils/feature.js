export default function(topology, ref) {
  return {
    type: "FeatureCollection",
    features: topology.objects[ref].geometries.map(g => {
      return {
        ...g,
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: []
        }
      }
    })
  };
}
