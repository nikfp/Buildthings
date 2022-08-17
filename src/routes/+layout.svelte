<script context="module" lang="ts">

	// import type { Load } from '@sveltejs/kit';
	// import {session} from '$app/stores'

	// export const load: Load = async function ({ url, session }) {
	// 	console.log('Layout Loading');
	// 	if (!session.user) {
	// 		if (url.pathname !== '/sign-in' && url.pathname !== '/sign-up') {
	// 			return {
	// 				status: 302,
	// 				redirect: `/sign-in?redirect=${url.pathname}&query=${url.search}`
	// 			};
	// 		}
	// 	}

	// 	return {};
	// };
</script>

<script lang="ts">
	import {session} from '$app/stores'

	import 'agnostic-svelte/css/common.min.css';
	import '../../static/style.css';

	import Footer from '../lib/components/layout/Footer.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Nav from '$components/layout/Nav.svelte';
	import SignOut from '$lib/components/SignOut.svelte';
	
	import {SvelteToast} from '@zerodevx/svelte-toast'

</script>

<div class="app-container">
	<SvelteToast />

<Header />

<Nav />

<main>

	{#if $session.signOut}
	<SignOut />
	{/if}
	<slot />
</main>

<Footer />

</div>

<style>

	.app-container {
		width: 100vw;
		height: 100vh;
		overflow-x: hidden;
		display: grid;
		grid-template-rows: 3rem 1fr 2rem;
		grid-template-columns: 8rem 1fr;
	}

	main {
		grid-area: 2 2 2 2;
		padding: .5rem;
	}

</style>
