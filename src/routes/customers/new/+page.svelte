<script lang="ts">
  import {goto} from "$app/navigation";

  import { newCustomerSchema } from '$shared/customer';

  import AddressPicker from '$components/AddressPicker.svelte';
  import TextInput from '$components/inputs/TextInput.svelte';
  import TrpcFormBuilder from '$components/TrpcFormBuilder.svelte';
  
  import { successToast } from '$components/toast';

</script>

<svelte:head>
    <title>Create New Customer</title>
</svelte:head>

<h1>Create a new customer</h1>

<TrpcFormBuilder 
  opName={"customer:create"} 
  inputValidator={newCustomerSchema} 
  onSuccessfulSubmit={async (args) => {
    successToast(`Customer: ${args.name} created`);
    goto(`/customers/${args.id}`);
  }}>
  <TextInput name="name" title="Customer Name"/>
  <TextInput name="phone" title="Phone Number"/>
  <AddressPicker />
</TrpcFormBuilder>