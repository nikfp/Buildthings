<script lang="ts">
  import { onMount } from "svelte";

  import Dialog from "./Dialog.svelte";
  import SelectInput from "./inputs/SelectInput.svelte";
  
  import NewAddress from "./forms/NewAddress.svelte";
  
  import type {InferQueryOutput} from '$client'
  import trpcClient from "$client";
  
  import { successToast } from "./toast";
  
  
  let dbAddresses: InferQueryOutput<'address:getAll'> = [];
  
  export let selectedId: string | undefined = undefined;

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

  $: defaultValue = addresses?.find(el => el.key === selectedId)?.key ?? "";

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
  <SelectInput selected={defaultValue} values={addresses} name="addressId" title="Address" inputMessage="Select an address" addNew={{buttonText: "Add New Address", onSelected: () => addressDialog.openDialog()}}/>
{/if}

<!-- <select>
  <option value="">One</option>
  <option value="Two" selected>Tow</option>
  <option value="Three">Three</option>
</select> -->