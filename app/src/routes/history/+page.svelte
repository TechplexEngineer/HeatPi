<script lang="ts">
	import LineChart from '$lib/components/LineChart.svelte';
	import type { ChartData } from 'chart.js';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	let a: ChartData<'line', number[], string> = $derived({
		labels: data.history.map((d) => d.date.toLocaleTimeString('en-US', { hour12: false })),
		datasets: [
			{
				label: 'Top',
				data: data.history.map((d) => d.top),
				borderColor: 'red',
				fill: false
			},
			{
				label: 'Mid',
				data: data.history.map((d) => d.mid),
				borderColor: 'orange',
				fill: false
			},
			{
				label: 'Bot',
				data: data.history.map((d) => d.bot),
				borderColor: 'blue',
				fill: false
			},
			{
				label: 'Box',
				data: data.history.map((d) => d.box),
				borderColor: 'grey',
				fill: false
			}
		]
	});

	const refresh = () => {
		invalidateAll();
	};

	const refreshIntervalMs = 1000;

	onMount(() => {
		const handle = setInterval(refresh, refreshIntervalMs);
		return () => clearInterval(handle);
	});
</script>

<div class="container">
	<div class="d-flex justify-content-between">
		<h1>History</h1>
		<div>
			<button
				class="btn btn-outline-primary mt-2"
				title={`Refreshes every ${refreshIntervalMs / 1000} sec`}>Refresh</button
			>
		</div>
	</div>

	<LineChart data={a} options={{}} />
</div>
