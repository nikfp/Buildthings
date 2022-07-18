<script lang="ts">
  import {page} from '$app/stores';

  export let href: string;
  export let routeTitle: string;

</script>

<a class:active="{$page.url.pathname === href}" {href}>
  {routeTitle}
</a>

<style>
  a {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--agnostic-font-color);
    transition: font-size .125s, border-bottom .125s;
  }
  a:not(:first-of-type) {
    padding-top: .25rem;
  }
  a.active {
    font-size: 1.5rem;
    border-bottom: 3px solid var(--accent-color-primary);
  }
  a.active:not(:first-of-type) {
    padding-top: .5rem;
  }

</style>