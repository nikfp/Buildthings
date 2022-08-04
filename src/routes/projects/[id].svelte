<script context="module" lang="ts">
  import type { Project$input} from '$houdini'
  import type { LoadEvent } from '@sveltejs/kit';

  
  export function ProjectVariables(event: LoadEvent): Project$input {
    const id = event.params["id"];
    return {id};
  }
</script>

<script lang="ts">
  import {query, graphql, type Project} from "$houdini";
  import Edit from '../../lib/components/icons/Edit.svelte';
  import { Spinner } from 'agnostic-svelte';

  const {data, loading} = query<Project>(graphql`
    query Project ($id:ID!) {
    getProjectById(id:$id) {
      id name 
      address {
        city street
      }
      customer {
        name
      }
    }
  }
  `)
</script>

{#if $loading}
  <Spinner size="xlarge" />
{/if}
{#if $data}
<h1>{$data.getProjectById.name}<span on:click={() => {}} class="edit-button"><Edit/></span></h1>
<p>{$data.getProjectById.address.street}, {$data.getProjectById.address.city}</p>
{/if}