<script lang="ts">
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';

	import { PencilIcon, EyeIcon } from 'lucide-svelte';
	import WriteContent from './write-content.svelte';
	import PreviewContent from './preview-content.svelte';
	import { writable } from 'svelte/store';
	const getcontent = (content: string) => {
		console.log({ content });
	};
</script>

<Tabs value="write" class="items-center border rounded-md">
	<div>
		<TabsList
			class="relative mb-3 flex h-auto w-full justify-between gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border"
		>
			<div>
				<TabsTrigger
					value="write"
					class="overflow-hidden rounded-none bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
				>
					<PencilIcon
						class="-ms-0.5 me-1.5 opacity-60"
						size={16}
						stroke-width={2}
						aria-hidden="true"
					/>
					Write
				</TabsTrigger>
				<TabsTrigger
					value="preview"
					class="overflow-hidden rounded-none bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
				>
					<EyeIcon
						class="-ms-0.5 me-1.5 opacity-60"
						size={16}
						stroke-width={2}
						aria-hidden="true"
					/>
					Preview
				</TabsTrigger>
			</div>

			<div class="hidden md:flex">buttons</div>
		</TabsList>
	</div>
	<TabsContent value="write">
		<WriteContent {getcontent} />
	</TabsContent>
	<TabsContent value="preview">
		<PreviewContent />
	</TabsContent>
</Tabs>
