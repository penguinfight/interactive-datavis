<script>
  import * as d3 from "d3";
  import germanstates from "../assets/germanstates.json";
  import { activeStation } from "./station.js";
  export let stations;
  export let padding = 10;
  $: projection = d3.geoMercator().fitExtent(
    [
      [padding, padding],
      [width - padding, height - padding],
    ],
    germanstates
  );
  function scrollTo(id) {
    let element = document.getElementById(id);
    element.scrollIntoView(true);
  }
  let width = 0;
  let height = 0;

  $: path = d3.geoPath(projection);

  function getStation(feature) {
    var feature = feature;
    return feature.geometry.coordinates;
  }

  function setActive(id) {
    if (id === $activeStation) {
      activeStation.set(null);
    } else {
      activeStation.set(id);
      scrollTo(id);
    }
  }
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="w-full h-full">
    {#each germanstates.features as feature (feature.id)}
      <path d={path(feature)} stroke="black" fill="none" />
    {/each}
    {#each stations.features as feature}
      {@const { id, name } = feature.properties}
      <circle
        class="active"
        on:mousedown={() => setActive(feature.properties.id)}
        style="transition: 200;"
        cx={projection(getStation(feature))[0]}
        cy={projection(getStation(feature))[1]}
        fill="red"
        stroke="none"
        r={$activeStation === feature.properties.id ? 10 : 3}
      />
    {/each}
  </svg>
</div>

<style>
  circle:hover {
    cursor: pointer;
  }
  path:hover {
    cursor: pointer;
  }
</style>
