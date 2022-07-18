<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import {session} from '$app/stores'

	import {houdiniClient} from '$lib/graphql-client/client'; 
	
	houdiniClient.init();

	export const load: Load = async function ({ url, session }) {
		console.log('Layout Loading');
		if (!session.user) {
			if (url.pathname !== '/sign-in' && url.pathname !== '/sign-up') {
				return {
					status: 302,
					redirect: `/sign-in?redirect=${url.pathname}&query=${url.search}`
				};
			}
		}

		return {};
	};
</script>

<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import SignOut from '$lib/components/SignOut.svelte';
	import 'agnostic-svelte/css/common.min.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Nav from '../lib/components/layout/Nav.svelte';

	import '../../static/style.css';
import Footer from '../lib/components/layout/Footer.svelte';

	async function signout() {
		try {
			const response = await fetch('/api/sign-out', {
				credentials: 'include',
				method: 'POST'
			});

			const body = await response.json();

			if (response.status === 200) {
				await invalidate('/sign-up');
				session.update((values) => {
					if (values.user) values.user = undefined;
					return values;
				});
				goto('/sign-in');
				return;
			}

			const message = body.message || 'An error occured while signing out';

			throw new Error(message);
		} catch (error) {
			console.log((error as Error).message);
			window.location.href = '/';
		}
	}

	$: userExists = $session.user ? true : false;
</script>

<div class="app-container">

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
