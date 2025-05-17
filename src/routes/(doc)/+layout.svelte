<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { onMount, type Snippet } from 'svelte';
	import AppSidebar from './components/app-sidebar.svelte';
	import NavRight from './components/sidebar/nav-right.svelte';
	import NavTop from './components/sidebar/nav-top.svelte';
	import type { LayoutServerData } from './$types';
	import type { iResult } from '@toolsntuts/utils';
	import type { iDocument } from '$lib/interface';
	import CrumbPath from '$lib/components/ui/crumb-path/crumb-path.svelte';
	import { groupedDocs } from './lib/stores'; 

	interface Props {
		data: LayoutServerData;
		children: Snippet;
	}

	let { children, data }: Props = $props();

	const setDocuments = (result: iResult) => {
		groupedDocs.group(result.data as iDocument[]);
	};

	onMount(() => {
		data.getDocuments.then(setDocuments).catch((error: Error) => console.error(error));
	});
</script>

<Sidebar.Provider>
	<AppSidebar />
	<Sidebar.Inset>
		<NavTop />
		<header
			class="sticky top-9 z-[10] flex h-16 shrink-0 items-center gap-2 bg-background lg:top-0"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<CrumbPath />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children()}
		</div>
	</Sidebar.Inset>
	<NavRight />
</Sidebar.Provider>
