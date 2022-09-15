<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	import { updateProjectSchema } from '$shared/project';
	import { addContactToProjectSchema } from '$shared/contactOnProject';

	import AddressPicker from '$components/AddressPicker.svelte';
	import Dialog from '$components/Dialog.svelte';
	import Edit from '$components/icons/Edit.svelte';
	import TextInput from '$components/inputs/TextInput.svelte';
	import { Button, Spinner } from 'agnostic-svelte';
	import TrpcFormBuilder from '$components/TrpcFormBuilder.svelte';

	import trpcClient, { type InferQueryOutput } from '$client';
	import { successToast } from '$components/toast';
	import ContactPicker from '$lib/components/ContactPicker.svelte';

	export let data: PageData;

	let project: InferQueryOutput<'project:getByIdWithDetails'> | null = null;

	$: id = data.id;

	onMount(async () => {
		project = await trpcClient.query('project:getByIdWithDetails', { id });
	});

	let projectDialog: Dialog;

	let contactDialog: Dialog;

	$: contacts =
		project?.contacts.map((el) => {
			return {
				...el,
				role: el.role
			};
		}) ?? null;

	function logContacts() {
		console.log(contacts);
	}
</script>

<svelte:head>
	{#if project}
		<title>Project: {project.name}</title>
	{:else}
		<title>Loading...</title>
	{/if}
</svelte:head>
<button on:click={logContacts}>log contacts</button>

{#if !project}
	<Spinner size="xlarge" />
{/if}
{#if project}
	<h1>
		{project.name}<Edit
			on:click={() => {
				console.log('clicked');
				projectDialog.openDialog();
			}}
		/>
	</h1>
	<p>{project.customer.name}</p>
	<p>{project.address.street}, {project.address.city}</p>
	<br />

	<Button
		type="button"
		on:click={() => {
			contactDialog.openDialog();
		}}>Add Contact</Button
	>

	<Dialog bind:this={projectDialog} title="Edit Project Info">
		<TrpcFormBuilder
			opName={'project:update'}
			inputValidator={updateProjectSchema}
			onSuccessfulSubmit={async () => {
				projectDialog.closeDialog();
				project = await trpcClient.query('project:getByIdWithDetails', { id });
				successToast('Project updated');
			}}
			initialValues={{
				id: project.id,
				name: project.name,
				customerId: project.customerId,
				addressId: project.addressId
			}}
		>
			<TextInput name="id" hidden title="id" value={project.id} />
			<TextInput name="name" title="Project Name" value={project.name} />
			<TextInput name="customerId" title="customerId" hidden value={project.customer.id} />
			<AddressPicker selectedId={project.address.id} />
		</TrpcFormBuilder>
	</Dialog>
	<Dialog bind:this={contactDialog} title="Add Contact">
		<TrpcFormBuilder
			opName={'contactOnProject:addContactToProject'}
			inputValidator={addContactToProjectSchema}
			onSuccessfulSubmit={async (_result) => {
				contactDialog.closeDialog();
				project = await trpcClient.query('project:getByIdWithDetails', { id });
				successToast('Contact added');
			}}
		>
			<TextInput name="projectId" title="Contact Id" hidden />
			<ContactPicker name="contactId" />
			<TextInput name="role" title="Role On Project" />
		</TrpcFormBuilder>
	</Dialog>
{/if}
