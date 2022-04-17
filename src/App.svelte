<script>
	import ML5 from "ml5";

	let seedInput = "Once upon a time ";
	let temperatureInput = 0.5;
	let lengthInput = 50;
	let modelOutput;

	let modelLoaded = false;

	function generate() {
		const data = {
			seed: seedInput,
			temperature: temperatureInput,
			length: lengthInput
		};
		// Generate content
		rnn.generate(data, (err, results) => {
			const oneLineResults = results.sample.replace(/(\r\n|\n|\r)/gm, "");
			modelOutput = seedInput + oneLineResults;
		});
	}

	// Create the character level generator with a pre trained model
	const rnn = ML5.charRNN("models/hemingway/", loadComplete);

	// When the model is loaded
	function loadComplete() {
		modelLoaded = true;
	}
</script>

<main>
	<h1>Automatic Hemingway</h1>

	<input bind:value={seedInput} disabled={!modelLoaded}><br/>
	<label for="temperature">Temperature: {temperatureInput}</label><input name="temperature" type=range bind:value={temperatureInput} min=0 max=1 step=0.01 disabled={!modelLoaded}><br/>
	<label for="length">Length: {lengthInput}</label><input name="length" type=range bind:value={lengthInput} min=1 max=100 disabled={!modelLoaded}><br/>
	<br/>
	<button on:click={generate}>
		Generate
	</button>
	<br/>
	<textarea readonly bind:value={modelOutput}/>
</main>

<style>
	main {
		text-align: center;
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
