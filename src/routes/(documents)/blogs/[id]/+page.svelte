<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import DocumentPage from '$lib/components/ui/document-layout/document-page.svelte';
	import AlertWidget from '$lib/components/ui/alert-widget/alert-widget.svelte';
	import type { iDocument } from '$lib/interface';

	let { data }: { data: PageData } = $props();
</script>

{#await data.getDocument}
	<!-- data.getDocument is pending -->
{:then result}
	{@const document = result.data as iDocument}
	<DocumentPage {document} />
{:catch error}
	<p>Couldn't load page because: {error}</p>
{/await}
