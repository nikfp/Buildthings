<script lang="ts">
  import {goto} from "$app/navigation";
  import TextInput from '../../lib/components/inputs/TextInput.svelte';
  import AddressPicker from '../../lib/components/AddressPicker.svelte';
  import TrpcFormBuilder from '../../lib/components/TrpcFormBuilder.svelte';
  import { newCustomerSchema } from '../../lib/trpc-shared/customer';
  import { successToast } from '../../lib/components/toast';

</script>

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