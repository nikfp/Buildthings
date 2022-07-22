<script lang="ts">
  import type { toZod } from "tozod";
  import type { ZodNumber, ZodString } from "zod";
  import NumberInput from "./inputs/NumberInput.svelte";
  import TextInput from "./inputs/TextInput.svelte";
  import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { reporter } from '@felte/reporter-svelte';
  import type {MutationStore} from "$houdini/runtime/lib/types";
  import { Button } from 'agnostic-svelte';
  import type {Scalars} from '$lib/graphql-client/generated/graphqlTypes'

  type TValidator = $$Generic<toZod<{[key: string]: Scalars[keyof Scalars]}>>;
  type TShape = TValidator['shape'];
  type TInputType = TValidator extends toZod<infer P> ? P : never;
  type TMutation = TValidator extends toZod<infer U> ? MutationStore<any, { input: U}> : never;
  type TFieldConfig = {[K in keyof TShape]: TShape[K] extends InstanceType<typeof ZodString> ? {
    fieldType: "STRING";
    label?: string;
    defaultValue?: string;
    hidden?: boolean;
  } : TShape[K] extends InstanceType<typeof ZodNumber> ? {
    fieldType: "NUMBER";
    label?: string;
    defaultValue?: number;
    hidden?: boolean;
  } : never }
  
  export let config: {
    validator: TValidator, 
    mutator: TMutation,
    fieldConfig: TFieldConfig,
    onSuccessfulSubmit?: () => any | Promise<any>
  }; 

  
  const {form} = createForm<TInputType>({
    onSubmit: async(values) => {
      const input = config.validator.parse(values);
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
  
  $: keys = Object.keys(config.validator.shape);
  $: fields = keys.map(key => {
    return {config: config.fieldConfig[key], fieldName: key};
  })
  
</script>

  <form use:form>
    {#each fields as entry}
    {#if entry.config.fieldType === "STRING"}
    <TextInput name={entry.fieldName} title={entry.config.label} hidden={entry.config.hidden} value={entry.config.defaultValue}/>
    {:else if entry.config.fieldType === "NUMBER"}
    <NumberInput name={entry.fieldName} title={entry.config.label} value={entry.config.defaultValue}/>
    {/if}
    {/each}
    <Button type="submit" isRounded={true}>Submit</Button>
  </form>

