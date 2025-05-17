<script lang="ts">
	import { page } from '$app/state';
	import AlertWidget from '$lib/components/ui/alert-widget/alert-widget.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const getDocuments = () => {
		return { docs: [], doc: {} }
	}
</script>

{#await data.getDocs}
	<div class="flex items-center justify-normal">
		<Skeleton class="h-16 w-full" />
	</div>
{:then result}
	{@const { docs, doc } = getDocuments()}
	
{:catch error}
	<AlertWidget
		variant="destructive"
		message={error.message}
		title="Error loading partners"
		href={page.url.pathname}
		linkText="Reload"
	/>
{/await}
