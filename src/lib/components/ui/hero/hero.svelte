<script lang="ts">
	import CenterContent from "./center-content.svelte";

  interface Props {
    type: "center-content" | "3d-isometric" | "animated-features"
  }
  let { type }: Props = $props()
</script>


{#if type === 'center-content'}
  <CenterContent />
{/if}
