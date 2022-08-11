<script context="module" lang="ts">
  import type { LoadEvent, Load } from '@sveltejs/kit';
  
  export const load: Load = (event: LoadEvent) => {
    const id = event.params["id"];
    console.log(`PROJECT ID: ${id}`)
    return {
      props: {
        id
      }
    }
  }

</script>

<script lang="ts">
  import {updateCustomerSchema} from '$lib/trpc-shared/customer'
  import {newProjectSchema} from "$lib/trpc-shared/project"
  import Edit from "../../lib/components/icons/Edit.svelte";
  import Dialog from '../../lib/components/Dialog.svelte';
  import { Button, Spinner } from 'agnostic-svelte';
  import Table from '$components/Table.svelte';
  import TextInput from "../../lib/components/inputs/TextInput.svelte";
  import AddressPicker from "../../lib/components/AddressPicker.svelte";
  import type { InferQueryOutput } from '../../lib/trpc-client';
  import { onMount } from 'svelte';
  import trpcClient from '../../lib/trpc-client';
  import TrpcFormBuilder from "../../lib/components/TrpcFormBuilder.svelte";

  export let id: string;

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

</script>
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
    onSuccessfulSubmit={ async () => {
      customer = await trpcClient.query("customer:getDetails", {id});
      customerDialog.closeDialog();
    }
  }>
    <TextInput name="id" title={"id"} hidden={true} value={customer.id}/>  
    <TextInput name="name" title={"Name"} value={customer.name}/>  
    <TextInput name="phone" title={"Phone Number"} value={customer.phone}/>  
    <AddressPicker selected={customer.address.id} />
  </TrpcFormBuilder>
</Dialog>
<Dialog bind:this={projectDialog} title="New Project">
  <TrpcFormBuilder 
    opName={"project:create"} 
    inputValidator={newProjectSchema}
    onSuccessfulSubmit={async () => {
      projectDialog.closeDialog();
      customer = await trpcClient.query("customer:getDetails", {id} )
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