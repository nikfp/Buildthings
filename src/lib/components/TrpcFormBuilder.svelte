<script lang="ts">
  import type { InferMutationInput, InferMutationOutput, Mutation } from "../trpc-client";
  import type { toZod } from "tozod";
  import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { reporter } from '@felte/reporter-svelte';
  import { Button } from 'agnostic-svelte';
  import { errorToast } from '$components/toast'

  import trpcClient from "$client";

  type TMutationName = $$Generic<Mutation>;

  type TMutationInput = InferMutationInput<TMutationName>;
  type TMutationOutput = InferMutationOutput<TMutationName>;
  

  // type TStringInput<T> = {type: "string", name: T, defaultValue?: string} & ({variant: "standard", hidden?: boolean} | {variant: "address"})

  // type TNumberInput<T> = {type: "number", name: T, defaultValue?: number}

  // export let fieldConfig: {[K in keyof TMutationInput]: TMutationInput[K] extends string ? TStringInput<K> : TMutationInput[K] extends number ? TNumberInput<K> : never} ;
      
  export let opName: TMutationName;
  export let inputValidator: toZod<TMutationInput>;
  export let onSuccessfulSubmit: (input: TMutationOutput) => any = (args) => {};
  export let initialValues: TMutationInput | undefined = undefined;

  const {form, data, setInitialValues } = createForm<TMutationInput>({
  onSubmit: async(values) => {
    const input = inputValidator.parse(values);
    if(!input) throw new Error("Invalid input");
    try {
      const result = await trpcClient.mutation(opName, input );
      return result;
    } catch (error) {
      throw new Error((error as Error).message);
      
    }
  },
  onError: (error) => {
    console.log('ERRORS');
    console.log(error);
    errorToast((error as Error).message)
  },
  onSuccess: async (success) => {
    onSuccessfulSubmit && await onSuccessfulSubmit((success as TMutationOutput));
  },
  extend: [validator({ schema: inputValidator }), reporter]
  });

  if(initialValues) setInitialValues(initialValues);

</script>

<form use:form>
  <slot />
  <Button type="submit" isRounded={true}>Submit</Button>
</form>