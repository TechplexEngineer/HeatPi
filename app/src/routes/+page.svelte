<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ChangeEventHandler } from 'svelte/elements';
	import type { PageData } from './$types';
	import ControlForm from '$lib/components/ControlForm.svelte';

	let { data }: { data: PageData } = $props();

	let durationHrs = $state(1);
</script>

<div class="container">
	<h1>Home Heating Control</h1>

	<div class="form-group mb-3">
		<label class="control-label" for="duration">Duration (Hour)</label>
		<div class="input-group">
			<input name="duration" type="text" bind:value={durationHrs} class="form-control" />
			<button class="btn btn-outline-secondary" type="button" onclick={() => (durationHrs = 1)}
				>1hr</button
			>
			<button class="btn btn-outline-secondary" type="button" onclick={() => (durationHrs = 0.25)}
				>15min</button
			>
			<button class="btn btn-outline-secondary" type="button" onclick={() => (durationHrs = 0.5)}
				>30min</button
			>
		</div>
	</div>

	<table class="table table-striped">
		<thead>
			<tr>
				<th></th>
				<th>Zone</th>
				<th>Status</th>
				<th>Force/Control</th>
				<!-- <th> Duration </th> -->
				<th>Setting active until</th>
			</tr>
		</thead>
		<tbody>
			{#each data.zones as zone}
				<tr>
					<td>{zone.id}</td>
					<td>{zone.name}</td>
					<td>
						{#if zone.status === 'on'}
							<div class="circle on" title="On"></div>
						{:else if zone.status === 'off'}
							<div class="circle off" title="Off"></div>
						{:else}
							<div class="circle" title="Unknown"></div>
						{/if}
					</td>
					<td>
						<ControlForm {zone} {durationHrs} />
					</td>
					<td>{zone.settingActiveUntil || '--'}</td>
				</tr>{/each}
		</tbody>
	</table>
</div>

<style>
	.circle {
		width: 15px;
		height: 15px;
		background: blue;
		-moz-border-radius: 50px;
		-webkit-border-radius: 50px;
		border-radius: 50px;
		color: transparent;
		display: inline-block;
	}
	.circle.on {
		background: green;
	}
	.circle.off {
		background: red;
	}
</style>
