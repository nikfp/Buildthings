<script lang="ts">
	import { sendInputSchema } from './graphql-server/validators/validators';
	import {GQL_SendIt} from "$houdini"
	import FormBuilder from './components/FormBuilder.svelte'
</script>

<h1>Send Input form</h1>
<p>{JSON.stringify($GQL_SendIt.data, null, 2)}</p>
<FormBuilder config={{validator: sendInputSchema, mutator: GQL_SendIt, fieldConfig: {
	words: {
		fieldType: "STRING",
		label: "What are the words?"
	},
	numbers: {
		fieldType: "NUMBER",
		label: "Number greater than 5"
	}
}}}/>

<style>
	form {
		display: flex;
		flex-direction: column;
		max-width: 30rem;
	}
</style>
