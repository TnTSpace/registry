<script lang="ts">
	import { generateSectionsFromHtmlString } from '$lib/fxns';
	import type { iDocument } from '$lib/interface';
	import { onMount, tick, type Snippet } from 'svelte';
	import { currentHtml, htmlSectionStore } from './stores';

	interface Props {
		document: iDocument;
	}

	let { document: doc }: Props = $props();

	const observation = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				$currentHtml.section = entry.target;
				$currentHtml.id = entry.target.id;
				$currentHtml.link = document.getElementById(`${entry.target.id}-link`) as Element;
			}
		});
	};

	const options: IntersectionObserverInit = { rootMargin: '-50% 0px' };

	onMount(() => {
		let observer: IntersectionObserver;

		const run = async () => {
			$htmlSectionStore = generateSectionsFromHtmlString(doc.content);
			await tick(); // Ensure DOM is updated

			observer = new IntersectionObserver(observation, options);

			$htmlSectionStore.forEach((section) => {
				const el = document.getElementById(section.id);
				if (el) observer.observe(el);
			});

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
      }
		};
	});
</script>

<div class="prose dark:prose-invert">
	<h1>{doc.title}</h1>
	{#each $htmlSectionStore as section, i}
		{@html section.content}
	{/each}
</div>
