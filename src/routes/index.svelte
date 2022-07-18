<script context="module" lang="ts">
	import {GQL_HelloThere} from "$houdini"
	import type { Load, LoadEvent } from '@sveltejs/kit';
	import SendInputform from '../lib/SendInputform.svelte';

	export const load: Load = async function (event: LoadEvent) {
		await GQL_HelloThere.fetch({ event });
		return {};
	};
</script>

<SendInputform />
