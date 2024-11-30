<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ChangeEventHandler } from 'svelte/elements';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const { zones } = data;

	let durationHrs = $state(1);
	let form: HTMLFormElement | undefined = $state();

	const radioBtnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const matches = event.currentTarget.name.match(/\[(\d+)\]/);
		const zoneNum = matches ? parseInt(matches[1]) : null;
		console.log('radioBtnChange', zoneNum, event.currentTarget.value);
		form?.requestSubmit();
	};
</script>

<div class="container">
	<h1>Home Heating Control</h1>

	<form
		action="?/set"
		method="post"
		use:enhance={() => {
			return async ({ update }) => {
				update({ reset: false });
			};
		}}
		bind:this={form}
	>
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
				{#each zones as zone}
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
							<input
								type="radio"
								name="zone[{zone.id}]"
								value="on"
								checked={zone.control == 'on'}
								onchange={radioBtnChange}
							/>
							On
							<input
								type="radio"
								name="zone[{zone.id}]"
								value="off"
								checked={zone.control == 'off'}
								onchange={radioBtnChange}
							/>
							Off
							<input
								type="radio"
								name="zone[{zone.id}]"
								value="thermostat"
								checked={zone.control != 'on' && zone.control != 'off'}
								onchange={radioBtnChange}
							/> Thermostat
						</td>
						<td>{zone.settingActiveUntil || '--'}</td>
					</tr>{/each}
			</tbody>
		</table>
	</form>
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
