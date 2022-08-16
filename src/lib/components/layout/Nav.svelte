<script>
import Navlink from "./Navlink.svelte";

</script>
<nav>
  <Navlink href="/" routeTitle="Home"/>
  <Navlink href="/customers" routeTitle="Customers"/>
  <Navlink href="/projects" routeTitle="Projects"/>
  <Navlink href="/contacts" routeTitle="Contacts" />
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