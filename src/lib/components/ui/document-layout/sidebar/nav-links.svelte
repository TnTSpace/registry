<script lang="ts">
	import BadgeCheck from '@lucide/svelte/icons/badge-check';
	import Bell from '@lucide/svelte/icons/bell';
	import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import CreditCard from '@lucide/svelte/icons/credit-card';
	import LogOut from '@lucide/svelte/icons/log-out';
	import Sparkles from '@lucide/svelte/icons/sparkles';

	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import type { Snippet } from 'svelte';
	import { HomeIcon, RssIcon, BriefcaseIcon, PhoneIcon } from 'lucide-svelte';
	import type { iRoute } from '$lib/interface';

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();

	const sidebar = useSidebar();

	let routes: iRoute[] = [
		{
			href: '/blogs',
			name: 'Blogs',
			icon: RssIcon
		},
		{
			href: '/legals',
			name: 'Legals',
			icon: BriefcaseIcon
		},
		{
			href: '/contact',
			name: 'Contact Us',
			icon: PhoneIcon
		}
	];

	const navigateToUrl = (url: string) => (location.href = url);
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						{@render children()}
						<ChevronsUpDown class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-[var(--bits-dropdown-menu-anchor-width)] min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						{@render children()}
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item onclick={() => navigateToUrl('/')}>
						<HomeIcon />
						Home
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					{#each routes as { name, href, icon }, i}
						{@const Icon = icon}
						<DropdownMenu.Item onclick={() => navigateToUrl(href)}>
							<Icon />
							{name}
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<LogOut />
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
