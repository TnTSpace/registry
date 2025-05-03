<script lang="ts">
	import { EllipsisIcon } from 'lucide-svelte';
	import { Button } from '../button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { onCopy } from '@toolsntuts/utils';

	interface Props {
		id: string;
	}

	let { id }: Props = $props();

  const handleCopy = async () => {
    await onCopy(id)
  }
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon">
        <span class="sr-only">Open menu</span>
        <EllipsisIcon class="size-4" />
      </Button>
		{/snippet}
	</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
      <DropdownMenu.Item onclick={handleCopy}>
        Copy ID
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>View customer</DropdownMenu.Item>
    <DropdownMenu.Item>View payment details</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
