<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  import SelectInput from "../inputs/SelectInput.svelte";
  
  import type {InferQueryOutput} from '$client'
  import trpcClient from "$client";
  import { Button } from "agnostic-svelte";
  
  let dbCustomers: InferQueryOutput<'customer:getAll'> | null = null;
  
  export let selected: string | undefined = undefined;

  onMount(async () => {
    dbCustomers = await trpcClient.query("customer:getAll");
  })

  $: addresses = dbCustomers ? dbCustomers.map(el => {
    return {
      key: el.id,
      value: el.id,
      optionText: `${el.name}`
    };
  }) : null;

</script>
<div class="pbs24">

  <Button on:click={() => goto("/customers/new")} size="small">Create new customer</Button>
</div>
{#if addresses}
  <SelectInput {selected} values={addresses} name="customerId" title="Customer" inputMessage="Select a Customer"/>
{/if}