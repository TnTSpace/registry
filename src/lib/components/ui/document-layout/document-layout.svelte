<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { Snippet } from 'svelte';
	import { Separator } from '../separator';
	import CrumbPath from '../crumb-path/crumb-path.svelte';
	import AppSidebar from './app-sidebar.svelte';
	import NavTop from './sidebar/nav-top.svelte';
	import NavRight from './sidebar/nav-right.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
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
