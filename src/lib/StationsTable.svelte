<script>
  import { activeStation } from "./station";
  export let stations;
  function setActive(id) {
    console.log($activeStation);
    if (id === $activeStation) {
        activeStation.set(null);
        
    } else {
      activeStation.set(id);
    }
  }
</script>

<div class="h-full">
  <table id="table">
    <tr style="background-color: #111111; color: #ffffff;">
      <th>Name</th>
      <th>State</th>
      <th>Height</th>
      <th>Coordinates</th>
    </tr>
    <hr>
    {#each stations.features as feature}
      <tr id={feature.properties.id} on:mousedown={() => setActive(feature.properties.id)}>
        <td class={$activeStation === feature.properties.id ? "active" : null}>
          {feature.properties.name}
        </td>
        <td class={$activeStation === feature.properties.id ? "active" : null}>
          {feature.properties.state}
        </td>
        <td class={$activeStation === feature.properties.id ? "active" : null}>
          {feature.properties.height}
        </td>
        <td class={$activeStation === feature.properties.id ? "active" : null}>
          {feature.geometry.coordinates[0]}
          /
          {feature.geometry.coordinates[1]}
        </td>
      </tr>
      <hr>

    {/each}
  </table>
</div>

<style>
  th {
    text-align: left;
    font-size: 16px;
    padding: 5px;
  }
  tr:nth-child(4n+1) {
    background-color: #555555;
    color: #ffffff;
  }
  tr:nth-child(4n+3) {
    background-color: #222222;
    color: #ffffff;
  }
  td {
    padding-left: 5px;
  }
  .active {
    background-color: #999999;
    color: black;
  }
</style>
