<script lang="ts">
	import * as ImageCropper from '$lib/components/ui/image-cropper';
	import { getFileFromUrl } from '$lib/components/ui/image-cropper';
	import { Upload } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { XIcon } from 'lucide-svelte';
	import type { iResult } from '@toolsntuts/utils';
	import { toast, Toaster } from 'svelte-sonner';
	import type { iImage } from '$lib/interface';
	import { fileSize } from '$lib/utils/file';
	import { cn } from '$lib/utils';
	import SpinLoader from '$lib/components/ui/spin-loader/spin-loader.svelte';

	interface Props {
		image?: iImage;
		imagekitEndpoint: string;
		onImage: (image?: iImage) => void;
	}

	let { image = $bindable(), imagekitEndpoint, onImage }: Props = $props();

	let src = $state(image ? image.url : '');
	let loading = $state(false);

	const onCropped = async (url: string) => {
		// if you need the file for a form you can call getFileFromUrl with the cropped url
		const file = await getFileFromUrl(url);

		try {
			loading = true;
			const formData = new FormData();
			formData.set('file', file);
			formData.set('fileSize', fileSize(file.size));

			const options: RequestInit = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(imagekitEndpoint, options);

			const { status, message, data } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				toast.success(message);
				image = data as iImage;
				onImage(image)
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	const removeFile = async (fileId: string) => {
		try {
			loading = true;
			const formData = new FormData();
			formData.set('fileId', fileId);

			const options: RequestInit = {
				method: 'delete',
				body: formData
			};

			const response = await fetch(imagekitEndpoint, options);
			const { message, status } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				toast.success('Successfully deleted');
				image = undefined
				onImage(undefined)
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};

	const removeImageClasses =
		'absolute left-1/2 top-1/2 z-50 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70';
</script>

<ImageCropper.Root {src} {onCropped}>
	<ImageCropper.UploadTrigger class={cn(loading && 'pointer-events-none')}>
		{#if image}
			<div class="relative">
				<Button
					onclick={() => removeFile((image as iImage).fileId)}
					variant="outline"
					size="icon"
					class={cn(removeImageClasses, loading && 'pointer-events-none')}
				>
					{#if loading}
						<SpinLoader class="size-7" />
					{:else}
						<XIcon />
					{/if}
				</Button>
				<img src={image?.url} alt="cropped" class="aspect-video w-full rounded-lg" />
			</div>
		{:else}
			<div class="flex aspect-video flex-col place-items-center justify-center gap-2">
				<div
					class="flex size-14 place-items-center justify-center rounded-full border border-dashed border-border text-muted-foreground"
				>
					{#if loading}
						<SpinLoader class="size-7" />
					{:else}
						<Upload class="size-7" />
					{/if}
				</div>
				<div class="flex flex-col gap-0.5 text-center">
					<span class="font-medium text-muted-foreground">
						Drag 'n' drop files here, or click to select files
					</span>
					<span class="text-sm text-muted-foreground/75">
						<span>You can upload 1 file</span>
						<span>Maximum size 10MB</span>
					</span>
				</div>
			</div>
		{/if}
	</ImageCropper.UploadTrigger>
	<ImageCropper.Dialog>
		<ImageCropper.Cropper aspect={1600 / 900} cropShape="rect" />
		<ImageCropper.Controls>
			<ImageCropper.Cancel />
			<ImageCropper.Crop />
		</ImageCropper.Controls>
	</ImageCropper.Dialog>
</ImageCropper.Root>
<Toaster position="top-center" richColors={true} closeButton={true} />