<script lang="ts">
  import 'agnostic-svelte/css/common.min.css';
  
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  import {newContactSchema} from '$shared/contact'
  
  import Table from '$components/Table.svelte';
  import { Button, Spinner } from 'agnostic-svelte';

  import trpcClient from '$client'
  import type {InferQueryOutput} from '$client'
  import Dialog from '$components/Dialog.svelte';
  import TrpcFormBuilder from '../../lib/components/TrpcFormBuilder.svelte';
import TextInput from '../../lib/components/inputs/TextInput.svelte';
import CustomerPicker from '../../lib/components/pickers/CustomerPicker.svelte';

  let contacts: InferQueryOutput<"contact:getAll"> | null = null;

  onMount(async () => {
    contacts = await trpcClient.query("contact:getAll");
  })

  $: preparedContacts = contacts?.map(el => {
    const {firstName, lastName, phone, id, customerId} = el;
    const customerName = el.customer.name
    const modifiedLastName = lastName ?? "";
    return {
      firstName, modifiedLastName, phone, id, customerName, customerId
    }
  })

  let dialog: Dialog;

</script>

<h1>Contacts</h1>

<Button type="button" on:click={() => dialog.openDialog()}>Create Contact</Button>

{#if !preparedContacts}
  <Spinner size="xlarge"/>
{:else}
  <Table 
    data={preparedContacts} 
    key={"id"} 
    fieldConfig={[
      {fieldName: "id", hidden: true, label: "id"},
      {fieldName: "firstName", label: "First Name"},
      {fieldName: "modifiedLastName", label: "Last Name"},
      {fieldName: "customerName", label: "Company", asLink: {
        hrefBuilder: (row) => {
          return `/customers/${row.customerId}`
        }
      }},
      {fieldName: "phone", label: "Phone Number"}
    ]}
    editFunction={(row) => {
      console.log(`Tapped edit for ${row.firstName}`);
    }}
    />
{/if}
<Dialog bind:this={dialog} title={"Create Contact"}>
  <TrpcFormBuilder 
    opName={"contact:create"} 
    inputValidator={newContactSchema}
    onSuccessfulSubmit={async () => {
      dialog.closeDialog();
      contacts = await trpcClient.query("contact:getAll");
    }}
    >
    <TextInput name="firstName" title="First Name"/>
    <TextInput name="lastName" title="Last Name"/>
    <TextInput name="phone" title="Phone Number"/>
    <CustomerPicker />
  </TrpcFormBuilder>
</Dialog>
