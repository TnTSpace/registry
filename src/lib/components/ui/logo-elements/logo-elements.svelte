<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
		title: string;
		subline: string;
	}

	let { children, title, subline }: Props = $props();
</script>

<div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-500">
	{@render children()}
</div>
<div class="grid flex-1 text-left text-sm leading-tight">
	<span class="truncate font-semibold">{title}</span>
	<span class="truncate text-xs">{subline}</span>
</div>
