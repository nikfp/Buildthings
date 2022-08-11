<script lang="ts">
	import trpcClient from '$lib/trpc-client';
  import TrpcFormBuilder from '../lib/components/TrpcFormBuilder.svelte';
  import {moreSchema} from '../lib/trpc-server/validators';
  import TextInput from '../lib/components/inputs/TextInput.svelte';
  import NumberInput from '../lib/components/inputs/NumberInput.svelte';
  import {successToast} from '$components/toast'

  async function hello() {
    console.log("STARTING CLIENT SEND");
    const greeting = await trpcClient.query("hello")
    console.log(greeting);
  }

  function toastMe() {
    successToast("Warning!")
  }

</script>


<h1>Welcome to the thing!</h1>
<hr />
<button type="button" on:click={hello}>Hello</button>
<hr />

<TrpcFormBuilder opName={"more"} inputValidator={moreSchema}>
  <TextInput name="things" title="Things"/>
  <NumberInput name="count" title="Count" value={0}/>
</TrpcFormBuilder>
<hr />
<button on:click={toastMe}>Push Toast</button>

