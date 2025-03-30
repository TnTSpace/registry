<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/ui/footer/footer.svelte';
	import Logo from './components/Logo.svelte';
	import { ClerkProvider } from 'svelte-clerk';
	import Header from '$lib/components/ui/header/header.svelte';
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
	import Wrap from '$lib/components/ui/wrap/wrap.svelte';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	<Header logo={Logo} />
	<Wrap>
		{@render children()}
	</Wrap>
	<Footer
		slogan="Raising a total kingdom child"
		logo={Logo}
		organizationName="RCN Lagos Children Department"
	/>
	<ModeWatcher />
</ClerkProvider>
