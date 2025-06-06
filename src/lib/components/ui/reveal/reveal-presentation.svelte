<script lang="ts">
	import type { iPresentation } from "./types";

  interface Props {
    presentations: iPresentation[]
  }

  let { presentations }: Props = $props()
</script>

{#each presentations as presentation, i}
   <!-- content here -->
{/each}