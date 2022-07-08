<script>
  export let stations;
  let width = 0;
  let height = 0;
</script>

<div class="w-full h-full" bind:clientWidth={width} bind:clientHeight={height}>
  <table>
    <tr>
      <th>Name</th>
      <th>State</th>
      <th>Height</th>
      <th>Coordinates</th>
    </tr>
    <br />
    {#each stations.features as feature}
      <tr>
        <td>
          {feature.properties.name}
        </td>
        <td>
          {feature.properties.state}
        </td>
        <td>
          {feature.properties.height}
        </td>
        <td>
          {feature.geometry.coordinates[0]}
          /
          {feature.geometry.coordinates[1]}
        </td>
      </tr>
    {/each}
  </table>
</div>

<style>
  th {
    text-align: left;
    font-size: 16px;
    padding: 5px;
  }
  tr {
  }
  td{
    padding-left: 5px;
  }
</style>
