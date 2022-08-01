<script lang="ts">
  import {GQL_CreateCustomer, mutation, graphql} from '$houdini';
  import {newCustomerSchema} from '$modules/Customer/validators'
  import FormBuilder from '$components/FormBuilder.svelte';
  import {goto} from "$app/navigation";
  import TextInput from '../../lib/components/inputs/TextInput.svelte';
  import AddressPicker from '../../lib/components/AddressPicker.svelte';

  const {} = mutation(graphql`
    mutation CreateCustomer($input: NewCustomerInput!) {
	  CreateCustomer(input: $input) {
		id
		name
    phone
    ...Customers_List_insert
	}
}
  `)


</script>

<h1>Create a new customer</h1>

<FormBuilder config={{
  validator: newCustomerSchema, 
  mutator: GQL_CreateCustomer, 
  onSuccessfulSubmit: () => {
    const customerId = $GQL_CreateCustomer.data?.CreateCustomer.id;
    goto(`/customers/${customerId}`);
  }
}}>
<TextInput name="name" title="Customer Name"/>
<TextInput name="phone" title="Phone Number"/>
<AddressPicker />
</FormBuilder>