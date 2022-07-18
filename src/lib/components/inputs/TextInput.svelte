<script lang="ts">
	import { ValidationMessage } from '@felte/reporter-svelte';
	import 'agnostic-svelte/css/common.min.css';
  import { Input, Alert } from "agnostic-svelte";
	import { fly } from 'svelte/transition'

	export let className = '';
	export let name: string;
	export let title: string;

	function messageJoin(messages: string[]) {
		if(messages.length === 1) return messages[0];
		return messages.join(', ');
	}

	$: componentClass = 'input ' + className;
</script>

<div class={componentClass}>
	<ValidationMessage for={name} let:messages={message}>
	<Input type="text" {name} id={name} label={title} isInvalid={!!message} invalidText={message ? messageJoin(message) : undefined} />
	</ValidationMessage>
</div>

<style>
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
