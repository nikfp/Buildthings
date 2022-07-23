<script context="module" lang="ts">
  import type { Customer$input } from '$houdini'
  
  export function CustomerVariables(event: LoadEvent): Customer$input {
    const id = event.params["id"];
    return {id};
  }
</script>

<script lang="ts">
  import {query, graphql, mutation, type Customer, GQL_UpdateCustomer} from "$houdini"
  import type { LoadEvent } from '@sveltejs/kit';
  import FormBuilder from "../../lib/components/FormBuilder.svelte";
  import {updateCustomerSchema} from '$modules/Customer/validators'
  import Edit from "../../lib/components/icons/Edit.svelte";
  import Dialog from '../../lib/components/Dialog.svelte';

  let dialog: Dialog; 
  const {data} = query<Customer>(graphql`
    query Customer($id: ID!) {
      getCustomerById(id: $id) {
        id
        name
      }
    } 
  `);

  const {} = mutation(graphql`
    mutation UpdateCustomer($input: UpdateCustomerInput!) {
      UpdateCustomer(input: $input) {
        id
        name
      } 
    }
  `);


</script>

{#if $data}
<h1>{$data.getCustomerById.name}<span on:click={() => dialog.openDialog()} class="edit-button"><Edit/></span></h1>
<Dialog bind:this={dialog} title="Edit Customer">
  <FormBuilder config={{
    mutator: GQL_UpdateCustomer,
    validator: updateCustomerSchema,
    onSuccessfulSubmit: () => dialog.closeDialog(),
    fieldConfig: {
      id: {
        fieldType: "STRING",
        hidden: true,
        defaultValue: $data.getCustomerById.id
      },
      name: {
        fieldType: "STRING",
        label: "Customer Name",
        defaultValue: $data.getCustomerById.name
      }
    }
    
  }} />
</Dialog>
{:else}
<p>Loading....</p>
{/if}

<style>
  .edit-button {
    padding: 0 .75rem;
    height: 3rem;
  }
</style>