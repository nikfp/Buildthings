<script lang="ts">
  import {mutation, graphql, GQL_CreateAddress} from "$houdini";
  import TextInput from "../inputs/TextInput.svelte";
  import {newAddressSchema} from '$modules/Address/validators'
import FormBuilder from "../FormBuilder.svelte";

  export let onSuccessfulSubmit: () => any | Promise<any> = () => {};


  const {} = mutation(graphql`
    mutation CreateAddress($input:NewAddressInput!) {
      createAddress(input: $input){
        ...All_Addresses_insert
      }
    }
  `)


</script>

<FormBuilder config={{
  validator: newAddressSchema,
  mutator: GQL_CreateAddress,
  onSuccessfulSubmit: async () => {
   await onSuccessfulSubmit();
  }
}}>
  <TextInput name="street" title="Street Address"/>
  <TextInput name="city" title="City"/>
</FormBuilder>