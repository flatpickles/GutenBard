<script>
	export let genText = "Loading...";
	import ML5 from "ml5";

	// Create the character level generator with a pre trained model
	const rnn = ML5.charRNN("models/hemingway/", modelLoaded);

	// When the model is loaded
	function modelLoaded() {
		// Generate content
		rnn.generate({ seed: "the meaning of pizza is" }, (err, results) => {
			console.log(results);
			genText = results.sample;
		});
	}
</script>

<main>
	<p>{genText}</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
