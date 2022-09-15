<script lang="ts">
  import { onMount } from 'svelte';

  import Table from '$components/Table.svelte';
  import { Spinner } from 'agnostic-svelte';

  import trpcClient, {type InferQueryOutput} from '$client';
  
  
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
  }).sort((el1, el2) => {
    if(el1.name.toLowerCase() < el2.name.toLowerCase()) {return -1}
    if(el1.name.toLowerCase() > el2.name.toLowerCase()) {return 1}
    return 0;
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