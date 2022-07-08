<script>
  import * as d3 from "d3";
  import germanstates from "../assets/germanstates.json";

  export let stations;
  export let padding = 10;
  $: projection = d3.geoMercator().fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    germanstates
  );
  let width = 0;
  let height = 0;

  $: path = d3.geoPath(projection);

  function getStation(feature) {
    var feature = feature;
    return feature.geometry.coordinates;
  }
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="w-full h-full">
    {#each germanstates.features as feature (feature.id)}
      <path d={path(feature)} stroke="black" fill="none" />
    {/each}
    {#each stations.features as feature}
      <ellipse
        cx={projection(getStation(feature))[0]}
        cy={projection(getStation(feature))[1]}
        fill="red"
        stroke="none"
        rx="2"
        ry="2"
      />
    {/each}
  </svg>
</div>
