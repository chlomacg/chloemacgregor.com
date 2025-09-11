<script lang="ts">
	import '../app.css';
    import { SvelteTheme } from 'svelte-themes';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<SvelteTheme>
	<nav></nav>
	<main>
		{@render children?.()}
	</main>
</SvelteTheme>

<style>
</style>
