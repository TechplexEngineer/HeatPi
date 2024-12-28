<script lang="ts">
	import { Chart, Tooltip, type ChartData, type ChartOptions } from 'chart.js';
	import type { HTMLCanvasAttributes } from 'svelte/elements';

	import 'chart.js/auto';
	import { onMount } from 'svelte';

	interface Props extends HTMLCanvasAttributes {
		data: ChartData<'line', number[], string>;
		options: ChartOptions<'line'>;
	}

	const { data, options, ...rest }: Props = $props();

	Chart.register(Tooltip);

	let canvasElem: HTMLCanvasElement;
	let chart: Chart;

	onMount(() => {
		chart = new Chart(canvasElem, {
			type: 'line',
			data,
			options
		});

		return () => {
			chart.destroy();
		};
	});

	$effect(() => {
		chart.data = data;
		chart.update('none');
	});
</script>

<canvas bind:this={canvasElem} {...rest}></canvas>
