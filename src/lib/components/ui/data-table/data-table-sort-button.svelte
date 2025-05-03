<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { ChevronsUpDownIcon } from "lucide-svelte";
  import { Button } from "../button";

  interface Props extends ComponentProps<typeof Button> {
    title: string
  }

  let { variant="ghost", title, ...restProps }: Props = $props()
</script>

<Button { variant } { ...restProps } class="justify-start -ml-4">
  <span>{title}</span>
  <ChevronsUpDownIcon class="ml-2" />
</Button>