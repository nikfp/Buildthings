<script lang="ts">

  import {onMount} from 'svelte';
  import type {PageData} from './$types'
  
  import {updateProjectSchema} from '$shared/project'

  import AddressPicker from "$components/AddressPicker.svelte";
  import Dialog from "$components/Dialog.svelte"
  import Edit from '$components/icons/Edit.svelte';
  import TextInput from "$components/inputs/TextInput.svelte";
  import { Spinner } from 'agnostic-svelte';
  import TrpcFormBuilder from "$components/TrpcFormBuilder.svelte";
  
  import trpcClient, { type InferQueryOutput } from '$client'
  import { successToast } from '$components/toast';

  export let data: PageData;

  let project: InferQueryOutput<"project:getByIdWithDetails"> | null = null;

  $: id = data.id

  onMount(async () => {
    project = await trpcClient.query("project:getByIdWithDetails", {id})
  })

  let projectDialog: Dialog;

</script>

{#if !project}
  <Spinner size="xlarge" />
{/if}
{#if project}

  <h1>{project.name}<Edit on:click={() => {
    console.log("clicked");
    projectDialog.openDialog();
  }} ></Edit></h1>
  <p>{project.address.street}, {project.address.city}</p>

  <Dialog bind:this={projectDialog} title="Edit Project Info">
    <TrpcFormBuilder 
      opName={"project:update"} 
      inputValidator={updateProjectSchema}
      onSuccessfulSubmit={async () => {
        projectDialog.closeDialog();
        project = await trpcClient.query("project:getByIdWithDetails", {id});
        successToast("Project updated")
      }}
      >
      <TextInput name="id" hidden title="id" value={project.id}/>
      <TextInput name="name" title="Project Name" value={project.name} />
      <TextInput name="customerId" title="customerId" hidden value={project.customer.id}/>
      <AddressPicker selected={project.address.id}/>
    </TrpcFormBuilder>
  </Dialog>
{/if}