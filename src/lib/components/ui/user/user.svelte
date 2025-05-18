<script lang="ts">
	import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, UserButton } from "svelte-clerk";
	import Skeleton from "$lib/components/ui/skeleton/skeleton.svelte";
	import { Button } from "$lib/components/ui/button";
	import { UserIcon } from "lucide-svelte";
	import { cn } from "$lib/utils";

  interface Props {
    class?: string
  }

  let { class: className }: Props = $props()

</script>

<ClerkLoading>
  <Skeleton class={cn("size-10 rounded-full", className)} />
</ClerkLoading>
<ClerkLoaded>
  <SignedIn>
    <UserButton
      appearance={{
        elements: {
					avatarBox: cn('size-10', className)
        }
      }}
    />
  </SignedIn>

  <SignedOut>
    <Button href="/sign-in" class="rounded-full" size="icon" variant="outline" aria-label="sign in">
      <UserIcon class={cn("size-10", className)} />
    </Button>
  </SignedOut>
</ClerkLoaded>