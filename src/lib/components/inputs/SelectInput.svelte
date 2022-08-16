<script lang="ts">
	import { ValidationMessage } from '@felte/reporter-svelte';
  import { Button } from 'agnostic-svelte';
  
  export let name: string;
  export let inputMessage: string;
  export let title: string | undefined;
  export let values: {key: string, value: string, optionText: string}[];
  export let selected: string | undefined = undefined;
  export let addNew: {buttonText: string, onSelected: () => any | Promise<any>} | undefined = undefined;
    console.log(selected);
 
</script>


  <div class="select-wrapper">
	  <ValidationMessage for={name} let:messages={message}>
      {#if addNew}
      <Button size="small" type={"button"} on:click={() => addNew?.onSelected()}>{addNew.buttonText}</Button>
      {/if}
      <label class={`select-label ${message ? "select-warning" : ""}`} for={name}>{title ?? name}</label>
      <select bind:value={selected} name={name} class={`select ${message ? "select-warning" : ""}`}>
        <option value="">{inputMessage}</option>
        {#each values as value (value.value)}
        <option value={value.value}>{value.optionText}</option>
        {/each}
      </select>
      {#if message}
        <p class="select-warning">{message}</p>
      {/if}  
    </ValidationMessage>
  </div>

<style>
  .select-wrapper {
    width: 100%;
    max-width: 100%;
    padding-top: 1rem;
    padding-bottom: 2rem;
  }

  .select-label {
    display: inline-block;
    margin-block-start: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    margin-block-end: var(--agnostic-input-label-pad, 0.375rem);
    vertical-align: initial;
    color: var(--agnostic-font-color);
    font-family: var(--agnostic-font-family-body);
    font-weight: var(--agnostic-font-weight, 300);
    font-size: var(--agnostic-font-size, 1rem);
    line-height: var(--agnostic-line-height, var(--fluid-20, 1.25rem));
    width: 100%;
    max-width: 100%;
    margin-top: 1rem;
  }
  
  .select {
    background-color: inherit;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23333330' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right var(--fluid-12) center;
    background-size: var(--fluid-16) var(--fluid-12);
    padding: var(--fluid-6) var(--fluid-32) var(--fluid-6) var(--fluid-12);
    -moz-padding-start: calc(var(--fluid-12) - 3px);
    font-size: var(--fluid-16);
    font-weight: 400;
    line-height: 1.5;
    color: var(--agnostic-dark);
    border: 2px solid var(--agnostic-select-border-color, var(--agnostic-gray-light));
    border-radius: var(--agnostic-radius);
    display: block;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  .select option {
    color: black;
  }

  .select-warning {
    color:  var(--agnostic-input-error-color, var(--agnostic-error));
    border-color: var(--agnostic-input-error-color, var(--agnostic-error));
  }
</style>