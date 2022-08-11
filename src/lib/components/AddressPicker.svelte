<script lang="ts">
  import SelectInput from "./inputs/SelectInput.svelte";
  import Dialog from "./Dialog.svelte";
  import NewAddress from "./forms/NewAddress.svelte";
  import type {InferQueryOutput} from '../trpc-client'
  import trpcClient from "../trpc-client";
  import { onMount } from "svelte";
import { successToast } from "./toast";
  
  let dbAddresses: InferQueryOutput<'address:getAll'> = [];
  
  export let selected: string | undefined = undefined;

  onMount(async () => {
    dbAddresses = await trpcClient.query("address:getAll");
  })

  $: addresses = dbAddresses ? dbAddresses.map(el => {
    return {
      key: el.id,
      value: el.id,
      optionText: `${el.street}, ${el.city}`
    };
  }) : null;

  let addressDialog: Dialog;
</script>

{#if addresses}
  <Dialog bind:this={addressDialog} title="Add New Address">
    <NewAddress onSuccessfulSubmit={async () => {
      dbAddresses = await trpcClient.query('address:getAll');
      addressDialog.closeDialog();
      successToast("New address created")
      }}/>
  </Dialog>
  <SelectInput {selected} values={addresses} name="addressId" title="Address" inputMessage="Select an address" addNew={{buttonText: "Add New Address", onSelected: () => addressDialog.openDialog()}}/>
{/if}