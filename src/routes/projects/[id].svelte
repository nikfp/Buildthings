<script context="module" lang="ts">
  import type { Project$input} from '$houdini'
  import type { LoadEvent } from '@sveltejs/kit';

  
  export function ProjectVariables(event: LoadEvent): Project$input {
    const id = event.params["id"];
    return {id};
  }
</script>

<script lang="ts">
  import {query, graphql, mutation, type Project, GQL_UpdateProject} from "$houdini";
  import Edit from '../../lib/components/icons/Edit.svelte';
  import { Spinner } from 'agnostic-svelte';
  import Dialog from "$components/Dialog.svelte"
  import FormBuilder from "../../lib/components/FormBuilder.svelte";
  import {updateProjectSchema} from '$modules/Project/validators'
  import TextInput from "../../lib/components/inputs/TextInput.svelte";
  import AddressPicker from "../../lib/components/AddressPicker.svelte";

  let projectDialog: Dialog;

  const {data, loading, refetch} = query<Project>(graphql`
    query Project ($id:ID!) {
    getProjectById(id:$id) {
      id name 
      address {
        city street id
      }
      customer {
        name id
      }
    }
  }
  `)

  mutation(graphql`
    mutation UpdateProject($input: UpdateProjectInput!) {
      updateProject(input: $input) {
        id
        name
      }
    }
  `)
</script>

{#if $loading}
  <Spinner size="xlarge" />
{/if}
{#if $data}

  <h1>{$data.getProjectById.name}<Edit on:click={() => {
    console.log("clicked");
    projectDialog.openDialog();
  }} ></Edit></h1>
  <p>{$data.getProjectById.address.street}, {$data.getProjectById.address.city}</p>

  <Dialog bind:this={projectDialog} title="Edit Project Info">
    <FormBuilder config={{
      validator: updateProjectSchema,
      mutator: GQL_UpdateProject,
      onSuccessfulSubmit: async () => {
        await refetch({id: $data?.getProjectById.id ?? ""});
        projectDialog.closeDialog();
      }}}>
      <TextInput name="id" hidden title="id" value={$data.getProjectById.id}/>
      <TextInput name="name" title="Project Name" value={$data.getProjectById.name} />
      <TextInput name="customerId" title="customerId" hidden value={$data.getProjectById.customer?.id}/>
      <AddressPicker selected={$data.getProjectById.address.id}/>
    </FormBuilder>
  </Dialog>
{/if}