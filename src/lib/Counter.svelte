<script>
  let count = 0;
  const increment = () => {
    count += 1;
  };
</script>

<button
  type="button"
  class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
  on:click={increment}>Clicks: {count}</button
>
