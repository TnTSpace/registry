<script module lang="ts">
	export type AcceptFileType =
		| '*/*'
		| 'image/*'
		| 'video/*'
		| 'audio/*'
		| 'application/*'
		| 'text/*'
		| 'image/png'
		| 'image/jpeg'
		| 'image/jpg'
		| 'image/webp'
		| 'image/gif'
		| 'application/pdf'
		| 'application/msword'
		| 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
		| 'application/vnd.ms-excel'
		| 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		| 'application/json'
		| 'text/plain'
		| 'text/csv'
		| 'video/mp4'
		| 'audio/mpeg'
		| '.png'
		| '.jpg'
		| '.jpeg'
		| '.webp'
		| '.gif'
		| '.pdf'
		| '.doc'
		| '.docx'
		| '.xls'
		| '.xlsx'
		| '.txt'
		| '.csv'
		| '.mp4'
		| '.mp3'
		| '.json';

	export type UploadedFile = {
		name: string;
		type: string;
		size: number;
		uploadedAt: number;
		image: () => Promise<iImage>;
	};
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		displaySize,
		FileDropZone,
		MEGABYTE,
		type FileDropZoneProps
	} from '$lib/components/ui/file-drop-zone';
	import { Progress } from '$lib/components/ui/progress';
	import type { iImage } from '$lib/interface';
	import { cn } from '$lib/utils';
	import { sleep } from '$lib/utils/sleep';
	import { XIcon } from '@lucide/svelte';
	import type { iResult } from '@toolsntuts/utils';
	import { onDestroy } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { SvelteDate } from 'svelte/reactivity';
	import SpinLoader from '../ui/spin-loader/spin-loader.svelte';
	import { Skeleton } from '../ui/skeleton';

	interface Props {
		class?: string;
		onUploaded: (files: UploadedFile[]) => void;
		maxFiles?: number;
		accept?: AcceptFileType;
		imagekitEndpoint: string;
	}

	let {
		class: className,
		maxFiles = 4,
		onUploaded,
		accept = 'image/*',
		imagekitEndpoint
	}: Props = $props();

	let files = $state<UploadedFile[]>([]);
	let date = new SvelteDate();
	let isDeleting = $state(false);

	const onUpload: FileDropZoneProps['onUpload'] = async (files) => {
		const uploaded = await Promise.allSettled(files.map((file) => uploadFile(file)));
		console.log({ uploaded });
		console.log('files have been uploaded');
	};

	const onFileRejected: FileDropZoneProps['onFileRejected'] = async ({ reason, file }) => {
		toast.error(`${file.name} failed to upload!`, { description: reason });
	};

	const uploadFile = async (file: File) => {
		// don't upload duplicate files
		if (files.find((f) => f.name === file.name)) return;
		// const urlPromise = new Promise<string>((resolve) => {
		// 	// add some fake loading time
		// 	sleep(1000).then(() => resolve(URL.createObjectURL(file)));
		// });

		const promise = async () => {
			const formData = new FormData();
			formData.set('file', file);

			const options: RequestInit = {
				method: 'post',
				body: formData
			};
			const response = await fetch(imagekitEndpoint, options);
			const { status, message, data } = (await response.json()) as iResult;

			if (status === 'error') {
				throw new Error(message);
			}
			const image = data as iImage;
			return image;
		};

		files.push({
			name: file.name,
			type: file.type,
			size: file.size,
			uploadedAt: Date.now(),
			image: promise
		});
	};

	onDestroy(async () => {
		for (const file of files) {
			// URL.revokeObjectURL(file.url);
		}
	});
	$effect(() => {
		const interval = setInterval(() => {
			date.setTime(Date.now());
		}, 10);
		return () => {
			clearInterval(interval);
		};
	});

	const removeFile = async (file: UploadedFile, i: number, image: iImage) => {
		// URL.revokeObjectURL(file.url);
		isDeleting = true;
		const promise = async (fileId: string) => {
			const formData = new FormData();
			formData.set('fileId', fileId);

			const options: RequestInit = {
				method: 'delete',
				body: formData
			};

			const response = await fetch(imagekitEndpoint, options);
			const result = (await response.json()) as iResult;
			return result;
		};
		const { message, status } = await promise(image.fileId);

		isDeleting = false;
		if (status === 'error') {
			toast.error(message);
		} else {
			toast.success('Successfully deleted');
			files = [...files.slice(0, i), ...files.slice(i + 1)];
		}
		// todo: remove from server
	};
</script>

<div class={cn('flex w-full flex-col gap-2', className)}>
	<FileDropZone
		{onUpload}
		{onFileRejected}
		maxFileSize={2 * MEGABYTE}
		{accept}
		{maxFiles}
		fileCount={files.length}
	/>
	<div class="flex flex-col gap-2">
		{#each files as file, i (file.name)}

		{#await file.image()}
		<div class="flex place-items-center justify-between gap-2">
			<div class="flex place-items-center gap-2">
				<Skeleton class="relative size-9 overflow-clip" />
				<div class="flex flex-col">
					<span>{file.name}</span>
					<span class="text-xs text-muted-foreground">{displaySize(file.size)}</span>
				</div>
			</div>
			<Progress
				class="h-2 w-full flex-grow"
				value={((date.getTime() - file.uploadedAt) / 1000) * 100}
				max={100}
			/>
		</div>
		{:then image}
		<div class="flex place-items-center justify-between gap-2">
			<div class="flex place-items-center gap-2">
					<div class="relative size-9 overflow-clip">
						<img
							src={image.url}
							alt={file.name}
							class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip"
						/>
					</div>
				<div class="flex flex-col">
					<span>{file.name}</span>
					<span class="text-xs text-muted-foreground">{displaySize(file.size)}</span>
				</div>
			</div>
			{#if isDeleting}
				<Button variant="outline" size="icon">
					<SpinLoader class="border-primary dark:border-white" />
				</Button>
			{:else}
				<Button variant="outline" size="icon" onclick={() => removeFile(file, i, image)}>
					<XIcon />
				</Button>
			{/if}
		</div>
		{:catch error}
			<p>{error}</p>
		{/await}
			<!-- <div class="flex place-items-center justify-between gap-2">
				<div class="flex place-items-center gap-2">
					{#await file.image() then image}
						<div class="relative size-9 overflow-clip">
							<img
								src={image.url}
								alt={file.name}
								class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip"
							/>
						</div>
					{/await}
					<div class="flex flex-col">
						<span>{file.name}</span>
						<span class="text-xs text-muted-foreground">{displaySize(file.size)}</span>
					</div>
				</div>
				{#await file.image()}
					<Progress
						class="h-2 w-full flex-grow"
						value={((date.getTime() - file.uploadedAt) / 1000) * 100}
						max={100}
					/>
				{:then image}
					{#if isDeleting}
						<Button variant="outline" size="icon">
							<SpinLoader class="border-primary dark:border-white" />
						</Button>
					{:else}
						<Button variant="outline" size="icon" onclick={() => removeFile(file, i, image)}>
							<XIcon />
						</Button>
					{/if}
				{/await}
			</div> -->
		{/each}
	</div>
</div>
