<script lang="ts">
	import '../app.css'; 
	import { ClerkProvider } from 'svelte-clerk'; 
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'; 
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	{@render children()}
	<ModeWatcher />
</ClerkProvider>
