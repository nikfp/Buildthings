<script lang="ts">
  import 'agnostic-svelte/css/common.min.css';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Table from '$components/Table.svelte';
  import { Button, Spinner } from 'agnostic-svelte';

  import trpcClient from '$client'
  import type {InferQueryOutput} from '$client'

  let customers: InferQueryOutput<"customer:getAll"> = [];
  let loading = true;

  onMount(async () => {
    customers = await trpcClient.query("customer:getAll");
    loading = false;
  })

</script>

<h1>Customers</h1>

<Button type="button" on:click={() => goto("/customers/new")}>Create new customer</Button>

{#if loading}
  <Spinner size="xlarge"/>
{/if}

{#if customers}
  <Table 
    key={"id"} 
    data={customers} 
    fieldConfig={[
      {fieldName: "id", label: "ID", hidden: true}, {fieldName: "name", label: "Customer Name", asLink: {
        hrefBuilder: (row) => `/customers/${row.id}`
      }},
      {fieldName: "phone", label: "Phone"},
  ]}/>
{/if}
