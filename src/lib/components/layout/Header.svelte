<script lang="ts">
  import { goto, invalidate } from '$app/navigation';
	import 'agnostic-svelte/css/common.min.css';
  import { Button } from "agnostic-svelte";
  import {session} from '$app/stores'

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

<header>
  {#if userExists}
    <p>Hello, {$session.user?.email}</p>
    <div class="buttons">
      <Button size="small" on:click={signout}>Sign out</Button>
    </div>
  {:else}
    <a href="sign-in">Sign in here!</a>
		<span>Or</span>
    <a href="sign-up">Sign up here!</a>
  {/if}
</header>

<style>
	header {
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		width: 100%;
		height: 3rem;
		padding: .5rem;
		border-bottom:2px solid var(--accent-color-primary);
		grid-row: 1;
		grid-column-start: 2;
		grid-column-end: 3;
	}

	span {
		padding: 0 .5rem;
	}

	.buttons {
		padding: 0 .5rem;
	}
</style>