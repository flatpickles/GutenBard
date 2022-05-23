<script>
	import Controls from "./Controls.svelte";
	import Editor from "./Editor.svelte";
</script>

<main>
	<Controls />
	<Editor />
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap');

	main {
		padding: 1em;
		max-width: 500px;
		margin: 0 auto;
		font-family: 'EB Garamond', serif;
	}
</style>
