<!--
	Installed from github/ieedan/shadcn-svelte-extras
-->

<script lang="ts">
	import * as Avatar from '../avatar';
	import type { ImageCropperPreviewProps } from './types';
	import { useImageCropperPreview } from './image-cropper.svelte.js';
	import { Upload } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	let { child, class: className }: ImageCropperPreviewProps = $props();

	const previewState = useImageCropperPreview();
</script>

<!-- {#if child}
	{@render child({ src: previewState.rootState.src })}
{:else}
	<Avatar.Root
		class={cn('ring-accent ring-offset-background size-20 ring-2 ring-offset-2', className)}
	>
		<Avatar.Image src={previewState.rootState.src} />
		<Avatar.Fallback>
			<Upload class="size-4" />
			<span class="sr-only">Upload image</span>
		</Avatar.Fallback>
	</Avatar.Root>
{/if} -->
