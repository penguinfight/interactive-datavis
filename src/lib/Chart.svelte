<script>
  import { axisLeft, filter, line, scaleTime, tickFormat } from "d3";
  import * as d3 from "d3";
  export let data;
  let attribute = "temperature_air_mean_200";
  let width = 0,
    height = 0, padding = 50;
  $: xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range([0, width-padding]);
  $: yScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => d["temperature_air_min_200"]),
      d3.max(data, (d) => d["temperature_air_max_200"]),
    ])
    .range([height-padding, 0]).nice();

  function isDefined(item) {
    if (isNaN(item)) {
      return false;
    }
    return true;
  }

  $: linePath = d3
    .line()
    .defined((d) => isDefined(d[attribute]))
    .x((item) => xScale(item.date))
    .y((item) => yScale(item[attribute]));

  $: area = d3
    .area()
    .defined(
      (d) => isDefined(d["temperature_air_max_200"]) && isDefined(d["temperature_air_min_200"])
    )
    .x((item) => xScale(item.date))
    .y0((item) => yScale(item["temperature_air_min_200"]))
    .y1((item) => yScale(item["temperature_air_max_200"]));

  var dates = d3.timeMonth.range(new Date(2021, 1, 2), new Date(2022, 7, 5));
  // var months = d3.map(dates, (d) => new Date(d).getMonth());
  var monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  $: yLines = d3.line().defined((d) => isDefined(d[attribute]));

  $: console.log(yScale.ticks());
</script>

<div class="h-full w-full" bind:clientWidth={width} bind:clientHeight={height}>
  <svg class="w-full h-full">
    {#each xScale.ticks(width / dates.length / 3) as tick}
      <g transform="translate({xScale(tick) + padding},0)">
        <line y1="0" y2={height} stroke="black" />
        <text>
          <tspan y={height - 5} x={-30}>{monthList[tick.getMonth()]}</tspan>
        </text>
      </g>
    {/each}
    {#each yScale.ticks(height/50) as tick}
      <g transform="translate(0, {yScale(tick)})">
        <line x1="0" x2={width} stroke="black" />
        <text>
          <tspan y={-5} x={5}>{tick + "°C"}</tspan>
        </text>
      </g>
    {/each}
  </svg>
  <svg id="chartsvg" class="" style="width: {width - padding}px; height: {height-padding}px; transform: translate({padding}px, {-height}px);">
    <path d={area(data)} fill="lightgray" stroke="gray" />
    <path d={linePath(data)} fill="none" stroke="black" />
  </svg>
  <div id="noData" style="background-color: white; color: black; transform: translate(0, {-2* height - padding * 0.5}px); width: 100%; height: {height + padding}px; text-align: center;">
    <h2 style="top: {height/2}px;">No Data</h2>
  </div>
</div>

<style>
</style>
