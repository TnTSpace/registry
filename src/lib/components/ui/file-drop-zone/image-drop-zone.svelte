<script lang="ts">
	import { Upload, XIcon } from 'lucide-svelte';
	import { Button } from '../button';
	import SpinLoader from '../spin-loader/spin-loader.svelte';
	import type { iFile } from '$lib/interface';
	import { toast } from 'svelte-sonner';
	import type { iResult } from '@toolsntuts/utils';
	import { cn } from '$lib/utils';
	import { fileSize } from '$lib/utils/file';

	interface Props {
		file?: iFile;
		endpoint: string;
		onFile: (file?: iFile) => void;
	}

	let { file = $bindable(), endpoint, onFile }: Props = $props();

	let loading = $state(false);
	let uploaded = $state(false);

	const removeFile = async (fileId: string) => {
		try {
			loading = true;
			const formData = new FormData();
			formData.set('fileId', fileId);

			const options: RequestInit = {
				method: 'delete',
				body: formData
			};

			const response = await fetch(endpoint, options);
			const { message, status } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				toast.success('Successfully deleted');
				uploaded = false;
				file = undefined;
				onFile(undefined);
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};
	const removeImageClasses =
		'absolute left-1/2 top-1/2 z-50 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 border-none';

	const dropzoneClasses =
		'border-border hover:bg-accent/25 flex w-full place-items-center justify-center rounded-lg border-2 border-dashed transition-all hover:cursor-pointer aria-disabled:opacity-50 aria-disabled:hover:cursor-not-allowed aspect-video';

	const onchange = async (e: Event) => {
		const target = e.currentTarget as HTMLInputElement;
		const newFile = target.files?.[0];
		if (!newFile) return;
		try {
			loading = true;
			const formData = new FormData();
			formData.set('file', newFile);
			formData.set('fileSize', fileSize(newFile.size));

			const options: RequestInit = {
				method: 'POST',
				body: formData
			};

			const response = await fetch(endpoint, options);

			const { status, message, data } = (await response.json()) as iResult;

			if (status === 'error') {
				toast.error(message);
			} else {
				(e.target! as HTMLInputElement).value = '';
				toast.success(message);
				file = data as iFile;
				onFile(file);
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			loading = false;
		}
	};
</script>

{#if file}
	<div class="relative">
		<Button
			onclick={() => removeFile((file as iFile).fileId)}
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
		<img src={file?.url} alt="cropped" class="aspect-video w-full rounded-lg" />
	</div>
{:else}
	<label
		for="file"
		class={cn(
			'flex aspect-video flex-col place-items-center justify-center gap-2',
			dropzoneClasses
		)}
	>
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
				Click to select file
			</span>
			<span class="text-sm text-muted-foreground/75">
				<span>You can upload 1 file</span>
				<span>Maximum size 10MB</span>
			</span>
		</div>
		<input {onchange} type="file" accept="image/*" id="file" name="file" style="display: none;" />
	</label>
{/if}
