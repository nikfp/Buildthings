<script lang="ts">
  import 'agnostic-svelte/css/common.min.css';
  import {query, graphql } from '$houdini';
  import type {GetCustomers} from '$houdini';
  import { Button } from 'agnostic-svelte';
  import { goto } from '$app/navigation';
  import Table from '$components/Table.svelte';

  const {data} = query<GetCustomers>(graphql`
    query GetCustomers {
	    getCustomers @list(name: "Customers_List") {
        id
        name
        phone
	    }
    }
  `)
</script>

<h1>Customers</h1>

<Button type="button" on:click={() => goto("/customers/new")}>Create new customer</Button>

{#if $data?.getCustomers}
  <Table 
    key={"id"} 
    data={$data.getCustomers} 
    fieldConfig={[
      {fieldName: "id", label: "ID", hidden: true}, {fieldName: "name", label: "Customer Name", asLink: {
        hrefBuilder: (row) => `/customers/${row.id}`
      }},
      {fieldName: "phone", label: "Phone"}
  ]}/>
{/if}