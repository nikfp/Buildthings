<script>
import Navlink from "./Navlink.svelte";

</script>
<nav>
  <Navlink href="/" routeTitle="Home"/>
  <Navlink href="/page-a" routeTitle="Page A"/>
  <Navlink href="/page-b" routeTitle="Page B"/>
</nav>

<style>
  nav {
		grid-row-start: 1;
    grid-row-end: 3;
		grid-column: 1;
    border-right: 2px solid var(--accent-color-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
	}
</style>