<script>
  import StationsMap from "./lib/StationsMap.svelte";
  import StationsTable from "./lib/StationsTable.svelte";
  import stations from "./assets/stations.geo.json";
  import data from "./assets/data.csv?raw";
  import Chart from "./lib/Chart.svelte";
  import * as d3 from "d3";
  import { activeStation } from "./lib/station";
  $: width = 0;
  const parseDate = d3.utcParse("%Y-%m-%d");
  var newdata = d3.csvParse(
    data,
    ({
      station_id,
      date,
      cloud_cover_total,
      humidity,
      precipitation_form,
      precipitation_height,
      pressure_air_site,
      pressure_vapor,
      snow_depth,
      sunshine_duration,
      temperature_air_max_200,
      temperature_air_mean_200,
      temperature_air_min_005,
      temperature_air_min_200,
      wind_gust_max,
      wind_speed,
    }) => ({
      id: station_id,
      date: parseDate(date),
      cloud_cover_total: Number.parseFloat(cloud_cover_total),
      humidity: Number.parseFloat(humidity),
      precipitation_form: precipitation_form,
      precipitation_height: Number.parseFloat(precipitation_height),
      pressure_air_site: Number.parseFloat(pressure_air_site),
      pressure_vapor: Number.parseFloat(pressure_vapor),
      snow_depth: Number.parseFloat(snow_depth),
      sunshine_duration: Number.parseFloat(sunshine_duration),
      temperature_air_max_200: Number.parseFloat(temperature_air_max_200),
      temperature_air_mean_200: Number.parseFloat(temperature_air_mean_200),
      temperature_air_min_005: Number.parseFloat(temperature_air_min_005),
      temperature_air_min_200: Number.parseFloat(temperature_air_min_200),
      wind_gust_max: Number.parseFloat(wind_gust_max),
      wind_speed: Number.parseFloat(wind_speed),
    })
  );
</script>

<body style="margin: 0;">
  <main class="flex flex-row gap-2 p-2 items-center w-screen h-screen">
    <section id="map" class="h-full" style="flex-grow: 2;">
      <StationsMap {stations} />
    </section>
    <div
      id="data"
      class="h-full"
      style="overflow-y: scroll; display: flex; flex-direction: column; padding-left: 7px; border-left: 2.5px solid gray;"
    >
      <section id="table" bind:clientWidth={width} class="h-full" style="overflow-y: scroll;">
        <StationsTable {stations} />
      </section>
      <section id="chart" class="" style="min-height: 30%; padding-top: 20px; overflow: hidden; width: {width}px;">
        {#if $activeStation}
          <Chart data={newdata.filter((d) => d.id === $activeStation)} />
        {/if}
      </section>
    </div>
  </main>
</body>
