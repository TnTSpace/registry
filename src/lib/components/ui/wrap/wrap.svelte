<script lang="ts">
	import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    class?: string;
  }

  let { children, class: className }: Props = $props()
</script>

<div class={className}>
  <div class="md:container py-0 px-4">
    {@render children()}
  </div>
</div>