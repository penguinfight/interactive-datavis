<script>
  import * as d3 from "d3";
  import germanstates from "../assets/germanstates.json";

  export let stations;
  export let padding = 10;
  let width = 0;
  let height = 0;

  $: projection = d3.geoMercator().fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    germanstates
  );

  $: path = d3.geoPath(projection);

  $: console.log(width, height);
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="w-full h-full">
    {#each germanstates.features as feature (feature.id)}
      <path d={path(feature)} stroke="black" fill="none" />
    {/each}
  </svg>
</div>
