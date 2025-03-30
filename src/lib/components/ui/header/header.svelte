<script lang="ts">
	import ModeToggle from '../mode-toggle/mode-toggle.svelte';
	import Navigation from '../navigation/navigation.svelte';
	import User from '../user/user.svelte';
	import Wrap from '../wrap/wrap.svelte';

	interface Props {
		logo: any
	}

	let { logo: Brand }: Props = $props()
</script>

<Wrap class="sticky left-0 top-0 z-[50] bg-white dark:bg-secondary shadow-lg">
	<div class="relative flex items-center justify-between h-14">
		<Brand />
		<div class="flex items-center gap-4">
			<Navigation />
			<div class="space-x-1 flex items-center gap-2">
				<ModeToggle />
				<User />
			</div>
		</div>
	</div>
</Wrap>
