<script lang="ts">
	import type { iPresentation } from "./types";

  interface Props {
    presentation: iPresentation;
    animate?: boolean;
    restart?: boolean
  }

  let { presentation, animate, restart }: Props = $props()
const { image, id, cta, url, subline, name } = presentation
</script>

<section
	class="relative"
	data-background-video-loop
	data-background-video-muted
	data-background-image={image}
	data-background-size="cover"
	data-background-color="black"
	data-background-opacity={0.5}
	data-auto-animate-id={id}
	data-auto-animate={animate || null}
	data-auto-animate-restart={restart || null}>
	<div class="flex flex-col items-center gap-4">
    <!-- <h2>{name}</h2> -->
    <p>{subline}</p>
    <a href={url} class="btn btn-constant-white !w-fit py-3 px-8 opacity-80" aria-label={cta}>{cta}</a>
  </div>
</section>