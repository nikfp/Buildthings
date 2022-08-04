<script context="module" lang="ts">
  import { GQL_CreateProject, type Customer$input } from '$houdini'
  
  export function CustomerVariables(event: LoadEvent): Customer$input {
    const id = event.params["id"];
    console.log(`PROJECT ID: ${id}`)
    return {id};
  }
</script>

<script lang="ts">
  import {query, graphql, mutation, type Customer, GQL_UpdateCustomer} from "$houdini"
  import type { LoadEvent } from '@sveltejs/kit';
  import FormBuilder from "../../lib/components/FormBuilder.svelte";
  import {updateCustomerSchema} from '$modules/Customer/validators'
  import {newProjectSchema} from "$modules/Project/validators"
  import Edit from "../../lib/components/icons/Edit.svelte";
  import Dialog from '../../lib/components/Dialog.svelte';
  import { Button, Spinner } from 'agnostic-svelte';
  import Table from '$components/Table.svelte';
  import TextInput from "../../lib/components/inputs/TextInput.svelte";
  import AddressPicker from "../../lib/components/AddressPicker.svelte";

  let customerDialog: Dialog; 
  let projectDialog: Dialog;
  const {data, refetch, loading} = query<Customer>(graphql`
    query Customer($id: ID!) {
      getCustomerById(id: $id) {
        id
        name
        phone
        projects {
          id name
          address {
            street city
          }
        }
        address {
          id city street
        }

      }
    } 
  `);

  const {} = mutation(graphql`
    mutation UpdateCustomer($input: UpdateCustomerInput!) {
      updateCustomer(input: $input) {
        id
        name
      } 
    }
  `);

  const {} = mutation(graphql`
    mutation CreateProject($input:NewProjectInput!) {
      createProject(input: $input) {
        id name
        
      }
    }
  `)

    $: tableData = $data?.getCustomerById.projects?.map(el => {
      const {id, name, address} = el;
      const {street, city} = address;
      return {
        id, name, street, city
      }
    }) ?? null;

</script>
{#if $loading}
  <Spinner size="xlarge" />
{/if}
{#if $data}
<h1>{$data.getCustomerById.name}<span on:click={() => customerDialog.openDialog()} class="edit-button"><Edit/></span></h1>
<p>{$data.getCustomerById.address.street}, {$data.getCustomerById.address.city}</p>
<Button type="button" on:click={() => projectDialog.openDialog()}>Create Project</Button>
{#if tableData}
<Table data={tableData} key={"id"} fieldConfig={[{fieldName: "name", label: "Project Name"}, {fieldName: "street", label: "Street"}, {fieldName: "city", label: "City"}]}/>
{/if}
<Dialog bind:this={customerDialog} title="Edit Customer">
  <FormBuilder config={{
    mutator: GQL_UpdateCustomer,
    validator: updateCustomerSchema,
    onSuccessfulSubmit: async () => {
      customerDialog.closeDialog();
      refetch();
    },
  }}>
<TextInput name="id" title={"id"} hidden={true} value={$data.getCustomerById.id}/>  
<TextInput name="name" title={"Name"} value={$data.getCustomerById.name}/>  
<TextInput name="phone" title={"Phone Number"} value={$data.getCustomerById.phone}/>  
<AddressPicker selected={$data.getCustomerById.address.id} />
</FormBuilder>
</Dialog>
<Dialog bind:this={projectDialog} title="New Project">
  <FormBuilder config={{
    validator: newProjectSchema, 
    mutator: GQL_CreateProject, 
    onSuccessfulSubmit: () => {
      projectDialog.closeDialog();
      refetch();
    }
}}>
<TextInput name="name" title="Project Name"/>
<TextInput name="customerId" hidden={true} value={$data.getCustomerById.id} title="Customer Id"/>
<AddressPicker />
</FormBuilder>
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