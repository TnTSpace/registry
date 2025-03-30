<script lang="ts">
	import { PhoneInput } from "$lib/components/ui/phone-input";
	import type { CountryCode } from "svelte-tel-input/types";
	import TiptapEditor from "$lib/components/ui/tiptap-editor/tiptap-editor.svelte";

	let country = $state<CountryCode>("NG")

	const getcontent = (content: string) => {
		console.log({ content })
	}
</script>

<h1>Homepage</h1>
<PhoneInput {country} />

<TiptapEditor {getcontent} />