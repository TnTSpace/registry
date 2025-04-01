<script lang="ts">
	import { PhoneInput } from '$lib/components/ui/phone-input';
	import type { CountryCode } from 'svelte-tel-input/types';
	import TiptapEditor from '$lib/components/ui/tiptap-editor/tiptap-editor.svelte';
	import * as ImageCropper from '$lib/components/ui/image-cropper';
	import { getFileFromUrl } from '$lib/components/ui/image-cropper';
	import Hero from '$lib/components/ui/hero/hero.svelte';

	let country = $state<CountryCode>('NG');

	const getcontent = (content: string) => {
		console.log({ content });
	};
</script>

<Hero
	type="center-content"
	title="Raising a total kingdom child"
	subline="We raise our children to be heavenly focused, earthly relevant and significant as the salt of the earth and the light of the world"
/>
<h1>Homepage</h1>
<PhoneInput {country} />

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
