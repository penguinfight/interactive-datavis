<script>
  import StationsMap from "./lib/StationsMap.svelte";
  import StationsTable from "./lib/StationsTable.svelte";
  import stations from "./assets/stations.geo.json";
</script>

<main class="flex flex-row gap-2 p-2 items-center w-screen h-screen">
  <section id="map" class="h-full grow">
    <StationsMap {stations} />
  </section>
  <section id="table" class="h-full">
    <StationsTable {stations} />
  </section>
</main>
