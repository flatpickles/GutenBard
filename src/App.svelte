<script>
	import Controls from "./Controls.svelte";
	import Editor from "./Editor.svelte";
</script>

<main>
	<Controls />
	<Editor />
</main>

<style>
	main {
		padding: 1em;
		max-width: 500px;
		margin: 0 auto;
	}

	input, textarea {
		width: 100%;
	}

	textarea {
		height: 10em;
	}
</style>
