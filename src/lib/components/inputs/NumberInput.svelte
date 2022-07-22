<script lang="ts">
	import { ValidationMessage } from '@felte/reporter-svelte';
	import 'agnostic-svelte/css/common.min.css';
  import { Input } from "agnostic-svelte";
	import { messageJoin } from './inputUtilities';

	export let className = '';
	export let name: string;
	export let title: string | undefined;
	export let value: number | undefined;

	$: componentClass = 'input ' + className;
</script>

<div class={componentClass}>
	<ValidationMessage for={name} let:messages={message}>
	<Input type="number" {name} label={title ?? name} isInvalid={!!message} invalidText={message ? messageJoin(message) : undefined} value={value?.toString()}/>
	</ValidationMessage>
</div>

<style>
	.input {
		display: flex;
		flex-direction: column;
	}

	.input:not(:first-of-type) {
		padding-top: 0.5rem;
	}

	.input:last-of-type {
		padding-bottom: 0.5rem;
	}

	.error-message {
		color: red;
	}
</style>
