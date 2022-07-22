<script context="module" lang="ts">
  import type { Customer$input } from '$houdini'
  
  export function CustomerVariables(event: LoadEvent): Customer$input {
    const id = event.params["id"];
    return {id};
  }
</script>

<script lang="ts">
  import {query, graphql, mutation, type Customer, GQL_UpdateCustomer} from "$houdini"
  import type { LoadEvent } from '@sveltejs/kit';
import FormBuilder from "../../lib/components/FormBuilder.svelte";
import {updateCustomerSchema} from '$modules/Customer/validators'

  const {data} = query<Customer>(graphql`
  query Customer($id: ID!) {
  getCustomerById(id: $id) {
    id
    name
  }
}
  `)

  const {} = mutation(graphql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
  UpdateCustomer(input: $input) {
    id
    name
  }
}
  `)
</script>

{#if $data}
<p>{$data.getCustomerById.name}</p>
<br />
<br />
<br />
<FormBuilder config={{
    mutator: GQL_UpdateCustomer,
    validator: updateCustomerSchema,
    fieldConfig: {
    id: {
      fieldType: "STRING",
      hidden: true,
      defaultValue: $data.getCustomerById.id
    },
    name: {
      fieldType: "STRING",
      label: "Customer Name",
      defaultValue: $data.getCustomerById.name
    }
  }
  
}} />
{:else}
<p>Loading....</p>
{/if}