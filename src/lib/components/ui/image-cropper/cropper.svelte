<script lang="ts">
	import * as ImageCropper from '$lib/components/ui/image-cropper';
	import { getFileFromUrl } from '$lib/components/ui/image-cropper';

	interface Props {
		src?: string;
    onCropped: (url: string) => void;
		open: boolean;
		label?: HTMLLabelElement
	}

	let { src, open = $bindable(), label = $bindable() }: Props = $props();

	const onCropped = async (url: string) => {
		// if you need the file for a form you can call getFileFromUrl with the cropped url
		const file = await getFileFromUrl(url);
		console.log(file);
	};
</script>

<ImageCropper.Root {src} {onCropped}>
	<ImageCropper.UploadTrigger {label}>
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
