<!--
	Installed from github/ieedan/shadcn-svelte-extras
-->

<script lang="ts">
	import { type WithChildren } from 'bits-ui';
	import { useImageCropperTrigger } from './image-cropper.svelte.js';

	interface Props {
		label?: HTMLLabelElement
	}

	let { children, label=$bindable() }: WithChildren & Props = $props();

	const triggerState = useImageCropperTrigger();
</script>

<label bind:this={label} for={triggerState.rootState.id} class="hover:cursor-pointer">
	{@render children?.()}
</label>
