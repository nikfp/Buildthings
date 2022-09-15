<script lang="ts">
  import { onMount } from 'svelte';
  import type {PageData} from './$types'

  import {updateCustomerSchema} from '$shared/customer'
  import {newProjectSchema} from "$shared/project"
  
  import AddressPicker from "$components/AddressPicker.svelte";
  import Edit from "$components/icons/Edit.svelte";
  import Dialog from '$components/Dialog.svelte';
  import Table from '$components/Table.svelte';
  import TextInput from "$components/inputs/TextInput.svelte";
  import TrpcFormBuilder from "$components/TrpcFormBuilder.svelte";
  
  import { Button, Spinner } from 'agnostic-svelte';
  import type { InferQueryOutput } from '$client';
  import trpcClient from '$client';
import { successToast } from '../../../lib/components/toast';

  export let data: PageData;

  export let customer: InferQueryOutput<"customer:getDetails"> | null = null;

  onMount(async () => {
    customer = await trpcClient.query("customer:getDetails", {id});
  })

  let customerDialog: Dialog; 
  let projectDialog: Dialog;

  $: tableData = customer?.projects.map(el => {
    const {id, name, address} = el;
    const {street, city} = address;
    return {
      id, name, street, city
    }
  }) ?? null;

  $: id = data.id;

</script>

<svelte:head>
  {#if customer }
    <title>Customer: {customer.name}</title>
  {:else}
    <title>Loading...</title>
  {/if}
</svelte:head>

{#if !customer}
  <Spinner size="xlarge" />
{/if}
{#if customer}
  <h1>{customer.name}<Edit on:click={() => customerDialog.openDialog()} /></h1>

  <p>{customer.address.street}, {customer.address.city}</p>

  <Button type="button" on:click={() => projectDialog.openDialog()}>Create Project</Button>

  {#if tableData}
    <Table data={tableData} key={"id"} fieldConfig={[
      {fieldName: "name", label: "Project Name", asLink: {
        hrefBuilder: (row) => `/projects/${row.id}`
      }}, 
      {fieldName: "street", label: "Street"}, 
      {fieldName: "city", label: "City"}]}/>
  {/if}

  <Dialog bind:this={customerDialog} title="Edit Customer">
    <TrpcFormBuilder 
      opName={"customer:update"} 
      inputValidator={updateCustomerSchema} 
      onSuccessfulSubmit={ async (info) => {
        customer = await trpcClient.query("customer:getDetails", {id});
        customerDialog.closeDialog();
        successToast(`"${info.name}" updated`)
      }}
      initialValues={{
      id: customer.id,
      name: customer.name, 
      phone: customer.phone,
      addressId: customer.addressId
      }}  
      >
      <TextInput name="id" title={"id"} hidden={true}/>  
      <TextInput name="name" title={"Name"} />  
      <TextInput name="phone" title={"Phone Number"} />  
      <AddressPicker selectedId={customer.address.id} />
    </TrpcFormBuilder>
    
  </Dialog>
  <Dialog bind:this={projectDialog} title="New Project">
    <TrpcFormBuilder 
      opName={"project:create"} 
      inputValidator={newProjectSchema}
      onSuccessfulSubmit={async (info) => {
        customer = await trpcClient.query("customer:getDetails", {id} )
        projectDialog.closeDialog();
        successToast(`Added project: ${info.name}`)
      }}
      >
      <TextInput name="name" title="Project Name"/>
      <TextInput name="customerId" hidden={true} value={customer.id} title="Customer Id"/>
      <AddressPicker />
    </TrpcFormBuilder>
  </Dialog>
  

{:else}
<p>Loading....</p>
{/if}

<style>
  
</style>