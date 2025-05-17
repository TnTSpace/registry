<script lang="ts" module>

	export const isOpen = writable<boolean>(false)
</script>
<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils';
	import { ChevronDownIcon, TextIcon } from 'lucide-svelte';
	import NavRightItems from './nav-right-items.svelte';
	import { writable } from 'svelte/store';

	const onOpenChange = (value: boolean) => {
		console.log({ value, $isOpen })
	}

</script>

<Popover.Root bind:open={$isOpen} {onOpenChange}>
	<Popover.Trigger class={cn(buttonVariants({ variant: "outline" }), "sticky top-0 z-10 border-b bg-background text-sm font-medium backdrop-blur-md md:top-0 md:bg-card lg:hidden rounded-none")}>
		<TextIcon class="size-4" />
		<span>On this page</span>
		<ChevronDownIcon class="size-4 ms-auto text-muted-foreground" />
	</Popover.Trigger>
	<Popover.Content>
		<NavRightItems />
	</Popover.Content>
</Popover.Root>