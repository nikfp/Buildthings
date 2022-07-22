<script lang="ts">
  import {query, graphql } from '$houdini';
  import type {GetCustomers} from '$houdini';

  const {data} = query<GetCustomers>(graphql`
    query GetCustomers {
	    getCustomers @list(name: "Customers_List") {
        id
        name
	    }
    }
  `)
</script>

<h1>Placeholder for customers page</h1>

<a class="btn btn-primary" href="/customers/new">Create new customer</a>

<ul>
  {#if $data?.getCustomers}
  {#each $data.getCustomers as customer}
    <li><a href="/customers/{customer.id}">{customer.name}</a></li>
  {/each}
  {/if}
</ul>