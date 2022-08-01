<script lang="ts">
	import { ValidationMessage } from '@felte/reporter-svelte';
	import 'agnostic-svelte/css/common.min.css';
  import { Input } from "agnostic-svelte";
	import { messageJoin } from './inputUtilities';

	export let className = '';
	export let name: string;
	export let title: string | undefined;
	export let value: string = '';
	export let hidden: boolean | undefined = false;

	$: componentClass = 'input ' + className;
</script>

<div class={componentClass}>
	{#if hidden}
	<input type="hidden" class="hidden" name={name} bind:value={value}>
	{:else}
	<ValidationMessage for={name} let:messages={message}>
	<Input type="text" {name} label={title ?? name} isInvalid={!!message} invalidText={message ? messageJoin(message) : undefined} bind:value={value}/>
	</ValidationMessage>
	{/if}
</div>

<style>
	.hidden {
		display: hidden;
	}
	.input {
		display: flex;
		flex-direction: column;
	}

	.input:not(:first-of-type) {
		padding-top: 1rem;
	}

	.input:last-of-type {
		padding-bottom: 1rem;
	}

	.error-message {
		color: red;
	}
</style>
