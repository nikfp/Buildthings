<script lang="ts">
  import Table from '../../lib/components/Table.svelte';
  import { Spinner } from 'agnostic-svelte';
  import trpcClient, {type InferQueryOutput} from '../../lib/trpc-client';
  import { onMount } from 'svelte';
  
  let projects: InferQueryOutput<"project:getWithDetails"> | null = null;

  onMount(async () => {
    projects = await trpcClient.query("project:getWithDetails");
  })

  $: preparedProjects = projects?.map(el => {
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

{#if !projects }
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