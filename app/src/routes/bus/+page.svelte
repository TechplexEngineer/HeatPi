<script lang="ts">
	import { enhance } from '$app/forms';
	import { addresses } from '$lib/i2caddresses';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<form class="container" method="POST" action="?/scan" use:enhance>
	<div class="d-flex justify-content-between">
		<h1>I2C Bus</h1>
		<div>
			<button class="btn btn-primary mt-2">Scan</button>
		</div>
	</div>
	<div class="row">
		<div class="col">
			<h3>Scan Result:</h3>
			<ul>
				{#each form?.deviceAddresses || [] as address}
					<li>{address} - {data.addressMap[address]}</li>
				{:else}
					<li>No devices found</li>
				{/each}
			</ul>
		</div>
		<div class="col">
			<h3>Expected addresses:</h3>
			<ul>
				{#each Object.entries(data.addressMap) as [address, name]}
					<li>{address} - {name}</li>
				{/each}
			</ul>
		</div>
	</div>
</form>
