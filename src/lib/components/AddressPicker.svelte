<script lang="ts">
  import {query, graphql, GQL_GetAllAddresses } from "$houdini"
  import type {GetAllAddresses} from "$houdini"
  import SelectInput from "./inputs/SelectInput.svelte";
  import Dialog from "./Dialog.svelte";
  import NewAddress from "./forms/NewAddress.svelte";
  export let selected: string | undefined = undefined;

  const {data} = query<GetAllAddresses>(graphql`
    query GetAllAddresses {
      getAddresses @list(name: "All_Addresses") {
        id
        city
        street
      }
    }
  `)
  
  $: addresses = $data ? $data.getAddresses?.map(el => {
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
      await GQL_GetAllAddresses.fetch();
      addressDialog.closeDialog();
      }}/>
  </Dialog>
  <SelectInput {selected} values={addresses} name="addressId" title="Address" inputMessage="Select an address" addNew={{buttonText: "Add New Address", onSelected: () => addressDialog.openDialog()}}/>
{/if}
<!-- <SelectInput /> -->