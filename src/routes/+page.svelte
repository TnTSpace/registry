<script lang="ts">
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import type { CountryCode } from 'svelte-tel-input/types';
	import * as ImageCropper from '$lib/components/ui/image-cropper';
	import { getFileFromUrl } from '$lib/components/ui/image-cropper';
	import Hero from '$lib/components/ui/hero/hero.svelte';
	import TagsInput from '$lib/components/ui/tags-input/tags-input.svelte';
	import Dropzone, { type UploadedFile } from '$lib/components/ui/file-drop-zone/drop-zone.svelte';
	import TelInput from '$lib/components/ui/tel-input/tel-input.svelte';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import type { iImage } from '$lib/interface';
	import Cropper from '$lib/components/ui/image-cropper/cropper.svelte';
	import { removeRingClasses } from '@toolsntuts/utils';
	import SwitchOne from '$lib/components/ui/switch/switch-one.svelte';

	let { data }: { data: PageServerData } = $props();

	let country = $state<CountryCode>('NG');
	let active = $state(false);

	const getcontent = (content: string) => {
		console.log({ content });
	};

	const onUploaded = (files: iImage[]) => {
		console.log({ files });
	};

	onMount(async () => {
		const file = await getFileFromUrl(
			'https://avatars.githubusercontent.com/u/124599?v=4',
			'id.png'
		);
	});

	$effect(() => console.log({ active }))
</script>

<Hero
	type="center-content"
	title="Raising a total kingdom child"
	subline="We raise our children to be heavenly focused, earthly relevant and significant as the salt of the earth and the light of the world"
/>
<TagsInput />
<PhoneInput {country} />
<TelInput {country} class={removeRingClasses()} />

<!-- <TiptapEditor {getcontent} /> -->
{#await data.getImages}
	<p>Loading Images</p>
{:then result}
	{@const images = result.data}
	<Cropper onImage={() => {}} imagekitEndpoint="/api/imagekit" image={images[0]} />
{:catch error}
	<h2>Unable to load images because</h2>
	<p>{error}</p>
{/await}

<!-- {#await data.getImages}
	<p>Loading Images</p>
{:then result}
	{@const images = result.data}
	<Dropzone {onUploaded} maxFiles={5} maxFileMB={10} imagekitEndpoint="/api/imagekit" initialFiles={images} accept="application/*" />
{:catch error}
	<h2>Unable to load images because</h2>
	<p>{error}</p>
{/await} -->

<SwitchOne
	name="Active"
	class="xl:col-span-2"
	description="Display or hide cell"
	bind:checked={active}
/>
