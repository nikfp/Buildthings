<script lang="ts">
  import type { toZod } from "tozod";
  import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { reporter } from '@felte/reporter-svelte';
  import type {MutationStore} from "$houdini/runtime/lib/types";
  import { Button } from 'agnostic-svelte';
  import type {Scalars} from '$lib/graphql-client/generated/graphqlTypes'

  type TValidator = $$Generic<toZod<{[key: string]: Scalars[keyof Scalars]}>>;
  type TInputType = TValidator extends toZod<infer P> ? P : never;
  type TMutation = TValidator extends toZod<infer U> ? MutationStore<any, { input: U}> : never;
  
  export let config: {
    validator: TValidator, 
    mutator: TMutation,
    onSuccessfulSubmit?: () => any | Promise<any>
  }; 

  
  const {form} = createForm<TInputType>({
    onSubmit: async(values) => {
      const input = config.validator.parse(values);
      console.log(input);
      await config.mutator.mutate({variables: {input}});
    },
    onError: (error) => {
      console.log('ERRORS');
			console.log(error);
    },
    onSuccess: async (_success) => {
			console.log('SUCCESS');
			config.onSuccessfulSubmit && await config.onSuccessfulSubmit();
		},
		extend: [validator({ schema: config.validator }), reporter]
  });
  
</script>

  <form use:form>
    <slot />
    <Button type="submit" isRounded={true}>Submit</Button>
  </form>

