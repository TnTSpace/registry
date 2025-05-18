<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { FileIcon } from 'lucide-svelte';
	import DocumentLayout from '$lib/components/ui/document-layout/document-layout.svelte';
	import { groupedDocs } from '$lib/components/ui/document-layout/stores';
	import type { iResult } from '@toolsntuts/utils';
	import type { iDocument } from '$lib/interface';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const setDocuments = (result: iResult) => {
		groupedDocs.group(result.data as iDocument[]);
	};
	onMount(() => {
		data.getDocuments.then(setDocuments)
		.catch(error => console.error(error))
	});
</script>

<DocumentLayout Logo={FileIcon} title="Jordan" subline="Recruitments">
	{@render children()}
</DocumentLayout>
