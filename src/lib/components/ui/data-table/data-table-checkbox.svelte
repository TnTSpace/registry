<script lang="ts">
  import type { ComponentProps } from "svelte";
  import { Checkbox } from "../checkbox";

  let {
    checked=false,
    onCheckedChange = (v) => (checked = v),
    ...restProps
  }: ComponentProps<typeof Checkbox> = $props()
</script>

<Checkbox bind:checked={() => checked, onCheckedChange} {...restProps} />