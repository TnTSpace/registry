<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';
	import { FileIcon } from 'lucide-svelte';
	import DocumentLayout from '$lib/components/ui/document-layout/document-layout.svelte';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<DocumentLayout Logo={FileIcon} title="Jordan" subline="Recruitments">
	{@render children()}
</DocumentLayout>
