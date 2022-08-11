<script lang="ts">
  import {newAddressSchema} from '$shared/address'
  
  import TextInput from "../inputs/TextInput.svelte";
  import TrpcFormBuilder from "../TrpcFormBuilder.svelte";

  export let onSuccessfulSubmit: () => any | Promise<any> = () => {};

</script>

<TrpcFormBuilder opName={"address:create"} inputValidator={newAddressSchema} onSuccessfulSubmit={() => {
  onSuccessfulSubmit();
}}>
  <TextInput name="street" title="Street Address"/>
  <TextInput name="city" title="City"/>
</TrpcFormBuilder>