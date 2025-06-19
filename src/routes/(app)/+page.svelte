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
	import type { iFile } from '$lib/interface';
	import Cropper from '$lib/components/ui/image-cropper/cropper.svelte';
	import { removeRingClasses } from '@toolsntuts/utils';
	import SwitchOne from '$lib/components/ui/switch/switch-one.svelte';
	import CroppieImageCropper from '$lib/components/ui/cropper/croppie-image-cropper.svelte';
	import ResponsiveTable from '$lib/components/ui/responsive-table/responsive-table.svelte';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { columns, data as tableData } from './table';
	import Cart from '$lib/components/ui/ecommerce/cart.svelte';
	import ImageDropZone from '$lib/components/ui/file-drop-zone/image-drop-zone.svelte';
	import TiptapEditor from '$lib/components/ui/tiptap-editor/tiptap-editor.svelte';
	import GithubEditor from '$lib/components/ui/github-editor/github-editor.svelte';
	import type { iPresentation } from '$lib/components/ui/reveal/types';
	import RevealDeck from '$lib/components/ui/reveal/reveal-deck.svelte';

	let { data }: { data: PageServerData } = $props();

	let country = $state<CountryCode>('NG');
	let active = $state(false);

	const onUploaded = (files: iFile[]) => {
		console.log({ files });
	};

	onMount(async () => {
		const file = await getFileFromUrl(
			'https://avatars.githubusercontent.com/u/124599?v=4',
			'id.png'
		);
	});

	$effect(() => console.log({ active }));

	const onFile = (file?: iFile) => {
		console.log({ file });
	};

	const getcontent = (content: string) => {
		console.log({ content });
	};

	const presentations: iPresentation[] = [
		{
			id: "1",
			active: true,
			date: "2023-12-28T12:24:23.913",
			order: 1,
			name: "RCN Lagos",
			subline: "Remnant Christian Network Lagos",
			image: "https://www.rcnlagos.org/images/uploads/rcnlagos.webp",
			type: "Generic",
			href: "https://www.rcnlagos.org/about/the-birth-of-rcn-lagos",
			cta: "rcn lagos",
			videourl: ""
		},
		{
			id: "2",
			active: true,
			date: "2023-12-28T12:25:52.184",
			order: 2,
			name: "Prayer Cells",
			subline: "Lagos must pray",
			image: "https://www.rcnlagos.org/images/uploads/prayercells.webp",
			type: "Generic",
			href: "https://www.rcnlagos.org/prayercells",
			cta: "prayercells",
			videourl: ""
		}
	]
</script>

<Hero
	type="left-right-image"
	badge={{
		text: '💼 Your Career Launcher',
		url: '/listings'
	}}
	title="Unlock Your Dream Job with Jordan Recruitments! 🚀"
	subline="We go beyond resumes — connecting talent to top-tier opportunities. 💼✨ Your next big move starts now. Let's get you hired! 🌟"
	image={{
		src: 'https://www.jordanrecruitments.com/_next/image?url=%2Frecruit2.webp&w=3840&q=75',
		alt: 'Jordan Recruitments'
	}}
/>
<RevealDeck {presentations} />
<TagsInput />
<PhoneInput {country} />
<TelInput {country} class={removeRingClasses()} />

{#await data.getImages}
	<p>Loading Images</p>
{:then result}
	{@const images = result.data}
	<!-- <Cropper onFile={() => {}} imagekitEndpoint="/api/imagekit" file={images[0]} />

	<CroppieImageCropper endpoint="/api/imagekit" file={images[0]} onFile={() => {}} /> -->
	<ImageDropZone endpoint="/api/imagekit" file={images[0]} {onFile} />
{:catch error}
	<h2>Unable to load images because</h2>
	<p>{error}</p>
{/await}

<!-- <ResponsiveTable /> -->

<DataTable {columns} data={tableData} />

<!-- <SwitchOne
	name="Active"
	class="xl:col-span-2"
	description="Display or hide cell"
	bind:checked={active}
/> -->

<Cart />

<!-- <TiptapEditor title="" content="" {getcontent} /> -->

<GithubEditor />