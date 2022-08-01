<script context="module" lang="ts">
	import {GQL_HelloThere} from "$houdini"
	import type { Load, LoadEvent } from '@sveltejs/kit';
	import SelectInput from "$components/inputs/SelectInput.svelte";
import AddressPicker from "../lib/components/AddressPicker.svelte";

	export const load: Load = async function (event: LoadEvent) {
		await GQL_HelloThere.fetch({ event });
		return {};
	};
	const values = [{key: "one", value: "one", optionText: "one"}, {key: "two", value: "two", optionText: "two"}, {key: "three", value: "three", optionText: "three"}, {key: "forou",value: "longerversion", optionText: "longerversion"}]

</script>
 <SelectInput inputMessage="Select option" name='testing' title={"Testing"} values={values}/>
