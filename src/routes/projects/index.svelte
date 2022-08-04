<script lang="ts">
  import {query, graphql} from '$houdini';
  import type {GetAllProjects} from "$houdini"
  import Table from '../../lib/components/Table.svelte';
  import { Spinner } from 'agnostic-svelte';
  
  const {data, loading} = query<GetAllProjects>(graphql`
  query GetAllProjects {
    getProjects {
      id
      name
      address {
        city
        street
      }
      customer {
        id name
      }
    }
  }
  `)

  $: preparedProjects = $data?.getProjects?.map(el => {
    const {id, name, address, customer} = el;
    const {city, street} = address;
    const customerName = customer?.name ?? "";
    const customerId = customer?.id ?? "";

    return {
      id, name, street, city, customerName, customerId
    }
  }) ?? null;

</script>

<h1>Projects</h1>

{#if $loading }
  <Spinner size="xlarge"/>
{/if}   

{#if preparedProjects }
  <Table data={preparedProjects} key={"id"} fieldConfig={[
    {fieldName: "id", hidden: true, label: "id"}, 
    {fieldName: "name", label: "Project Name", asLink: {
      hrefBuilder: (row) => `/projects/${row.id}`
    }
    },
    {fieldName: "street", label: "Street"},
    {fieldName: "city", label: "City"},
    {fieldName: "customerName", label: "Customer", asLink: {
      hrefBuilder: (row) => `/customers/${row.customerId}`
    }},
    ]}/>
{/if}