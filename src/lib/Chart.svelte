<script>
  import { axisLeft, filter, line, scaleTime, tickFormat } from "d3";
  import * as d3 from "d3";
  import { activeChart } from "./station";
  export let data;
  let attribute = null;
  let attribute1 = null;
  let attribute2 = null;
  let precipitation_min = null;
  let sufix = null;
  $: if ($activeChart == "Temperature") {
    attribute = "temperature_air_mean_200";
    attribute1 = "temperature_air_min_200";
    attribute2 = "temperature_air_max_200";
    precipitation_min = null;
    sufix = "°C";
  } else {
    attribute = "precipitation_height";
    attribute1 = null;
    attribute2 = null;
    precipitation_min = 0;
    sufix = "mm";
  }
  let width = 0,
    normalheight,
    height = 0,
    padding = 50;
  $: height = normalheight - 20;
  $: xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range([0, width - padding]);
  $: yScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => d[attribute1] - 5 || precipitation_min || d[attribute]),
      d3.max(data, (d) => d[attribute2] + 5 || d[attribute]),
    ])
    .range([normalheight - padding, 0]);

  $: linePath = d3
    .line()
    .defined((d) => !isNaN(d[attribute]))
    .x((item) => xScale(item.date) + padding)
    .y((item) => yScale(item[attribute]));

  $: dates = d3.timeMonth.range(new Date(2021, 1, 2), new Date(2022, 7, 5));
  $: console.log(dates.length);

  function getAverage(data) {
    var bar = [];
    for(let i = 0; i < dates.length; i++) {
    let average = [];
    data.forEach(element => {
      if(element.date > dates[i] && (element.date < dates[i + 1])) {
        average.push(element[attribute]);
      }
    });
    bar.push({month: i, precipitation: d3.sum(average)/average.length})
  }
  return bar;
  }

  $: console.log(getAverage(data));
  $: area = d3
    .area()
    .defined((d) => !isNaN(d[attribute1]) && !isNaN[attribute2])
    .x((item) => xScale(item.date) + padding)
    .y0((item) => yScale(item[attribute1]))
    .y1((item) => yScale(item[attribute2]));

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
    "Dec",
  ];

  $: attributes = d3.map(data, (d) => d[attribute]);
  $: if (d3.count(attributes) <= 5) {
    height = 0;
  } else {
    height = normalheight - 20;
  }
  function consoleLog(item) {
    console.log(item);
  }
</script>

<div class="h-full w-full" bind:clientWidth={width} bind:clientHeight={normalheight}>
  <div style="width: {width}px; height: {height}px;">
    <svg class="w-full h-full ">
      {#if $activeChart == "Precipitation"}
        {#each getAverage(data) as average}
          <rect fill="lightgray" stroke="darkgray" x={average.month*(width-padding)/getAverage(data).length + padding} width={(width-padding)/getAverage(data).length} y={(yScale(average.precipitation))} height={height-(yScale(average.precipitation))}></rect>
        {/each}
    {/if}
      {#each xScale.ticks(width / dates.length / 3) as tick}
        <g transform="translate({xScale(tick) + padding},0)">
          <line y1="0" y2={height} stroke="black" />
          <text>
            <tspan y={height - 5} x={-30}>{monthList[tick.getMonth()]}</tspan>
          </text>
        </g>
      {/each}
      {#each yScale.ticks() as tick}
        <g transform="translate(0, {yScale(tick)})">
          <line x1="0" x2={width} stroke="black" />
          <text>
            <tspan y={-5} x={5}>{tick + sufix}</tspan>
          </text>
        </g>
      {/each}
    {#if $activeChart == "Temperature"}
      <path d={area(data)} fill="lightgray" stroke="gray" />
      <path d={linePath(data)} fill="none" stroke={"black"} />
    {/if}
    </svg>
  </div>
</div>

<style>
  .active {
    display: none;
  }
</style>
