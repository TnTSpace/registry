<script lang="ts">
	import { generateSectionsFromHtmlString } from '$lib/fxns';
	import { onMount, tick } from 'svelte';
	import type { PageServerData } from './$types';
	import { currentHtml, htmlSectionStore } from '../../../lib/stores';
	import { isClickScrolling } from '../../../components/sidebar/nav-right-items.svelte';

	let { data }: { data: PageServerData } = $props();

	const observation = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				if (!$isClickScrolling) {
					$currentHtml.section = entry.target;
					$currentHtml.id = entry.target.id;
					$currentHtml.link = document.getElementById(`${entry.target.id}-link`) as Element;
				}
			}
		});
	};

	const options: IntersectionObserverInit = { rootMargin: '-50% 0px' };

	onMount(() => {
		let observer: IntersectionObserver;

		const run = async () => {
			$htmlSectionStore = generateSectionsFromHtmlString(data.doc.content);
			await tick(); // Ensure DOM has updated

			observer = new IntersectionObserver(observation, options);

			$htmlSectionStore.forEach((section, i) => {
				const el = document.getElementById(section.id);
				if (el) observer.observe(el);
			});
		};

		run();

		// Return cleanup function
		return () => {
			if (observer) {
				$htmlSectionStore.forEach((section) => {
					const el = document.getElementById(section.id);
					if (el) observer.unobserve(el);
				});
				observer.disconnect();
			}
		};
	});
</script>

<div class="prose dark:prose-invert">
	<h1>{data.doc.title}</h1>
	{#each $htmlSectionStore as section, i}
		{@html section.content}
	{/each}
</div>
