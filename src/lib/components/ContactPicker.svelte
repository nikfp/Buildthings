<script lang="ts">
  import type {InferQueryOutput} from "$client";
  import trpcClient from "$client";
  import { onMount } from "svelte";
  import SelectInput from "./inputs/SelectInput.svelte";

  export let name: string;

  let contacts: InferQueryOutput<"contact:getAll">;

  onMount(async () => {
    contacts = await trpcClient.query("contact:getAll");
  })

  $: preparedContacts = contacts ? contacts.map(el => {
    return {
      key: el.id,
      value: el.id,
      optionText: `${el.firstName} ${el.lastName + " "}- ${el.customer.name} (${el.phone})`
    }
  }) : null;

</script>

{#if preparedContacts}
  <SelectInput 
    inputMessage="Select a contact to add" 
    values={preparedContacts}
    name={name}
    title="Contact"
    />
{/if}