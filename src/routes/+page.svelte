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

	let { data }: { data: PageServerData } = $props();

	let country = $state<CountryCode>('NG');

	const getcontent = (content: string) => {
		console.log({ content });
	};

	const onUploaded = (files: UploadedFile[]) => {
		console.log({ files });
	};

	onMount(async () => {
		const file = await getFileFromUrl(
			'https://avatars.githubusercontent.com/u/124599?v=4',
			'id.png'
		);
		console.log({ file });
	});
</script>

<Hero
	type="center-content"
	title="Raising a total kingdom child"
	subline="We raise our children to be heavenly focused, earthly relevant and significant as the salt of the earth and the light of the world"
/>
<TagsInput />
<PhoneInput {country} />
<TelInput {country} />

<!-- <TiptapEditor {getcontent} /> -->

<ImageCropper.Root
	src="https://github.com/shadcn.png"
	onCropped={async (url) => {
		// if you need the file for a form you can call getFileFromUrl with the cropped url
		const file = await getFileFromUrl(url);
		console.log(file);
	}}
>
	<ImageCropper.UploadTrigger>
		<ImageCropper.Preview />
	</ImageCropper.UploadTrigger>
	<ImageCropper.Dialog>
		<ImageCropper.Cropper />
		<ImageCropper.Controls>
			<ImageCropper.Cancel />
			<ImageCropper.Crop />
		</ImageCropper.Controls>
	</ImageCropper.Dialog>
</ImageCropper.Root>

{#await data.getImages}
	<p>Loading Images</p>
{:then result}
	{@const images = result.data}
	<Dropzone {onUploaded} imagekitEndpoint="/api/imagekit" initialFiles={images} />
{:catch error}
	<h2>Unable to load images because</h2>
	<p>{error}</p>
{/await}
