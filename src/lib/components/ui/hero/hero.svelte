<script lang="ts">
	import CenterContent from "./center-content.svelte";

  interface Props {
    type: "center-content" | "3d-isometric" | "animated-features",
    title: string;
    subline: string
  }
  let { type, title, subline }: Props = $props()
</script>


{#if type === 'center-content'}
  <CenterContent {title} {subline} />
{/if}
