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
			}
		]
	});

	const refresh = () => {
		invalidateAll();
	};

	onMount(() => {
		const handle = setInterval(refresh, 500);
		return () => clearInterval(handle);
	});
</script>

<div class="container">
	<div class="d-flex justify-content-between">
		<h1>History</h1>
		<div>
			<!-- <button class="btn btn-primary mt-2">Scan</button> -->
		</div>
	</div>

	<LineChart data={a} />
</div>
