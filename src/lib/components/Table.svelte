<script lang="ts">
  import type {Scalars} from '$graphql/generated/graphqlTypes'
  type TInput = $$Generic<{[key: string]: Scalars[keyof Scalars]}[]>
  type TInputType = TInput[0];

  type TKeyName = keyof TInputType

  type TFieldConfig = TInputType extends infer P ? {fieldName: keyof P, label: string, hidden?: boolean, asLink?: {
    hrefBuilder: (data: TInputType) => string;
  } }[] : never;

  /**
   * An array of objects with the same shape. 
   * NOTE that the shape of these objects dictates details of other props
   * ALSO NOTE that objects need to be flattened for use. 
   */
  export let data: TInput;

  /**
   * An array of objects shaping header labels and order of field output. 
   */
  export let fieldConfig: TFieldConfig;

  /**
   * Property name in items of Data prop that can be used as a unique key for each object
   */
  export let key: TKeyName;

</script>

<table>
  <thead>

    <tr>
      {#each [...fieldConfig] as {label, hidden}}
      {#if !hidden}
      <th>{label}</th>
      {/if}
      {/each}
    </tr>  
  </thead>
  <tbody>
    
    {#each data as row (row[key])}
    <tr>
      {#each [...fieldConfig] as {fieldName, hidden, asLink}}
      {#if !hidden}
      <td>
        {#if asLink}
        <a href={asLink.hrefBuilder(row)}>{row[fieldName]}</a>
        {:else}
        {row[fieldName]}
        {/if}
      </td>
      {/if}
      {/each}
    </tr>
    {/each}
  </tbody>
  </table>
  
<style>
  table {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  thead {
    border-bottom: 1px solid var(--accent-color-primary);
  }

  td, th {
    padding: .25rem .5rem;
  }

  tbody tr:not(:last-of-type){
    border-bottom: 1px solid var(--accent-color-primary)
  }
</style>