export class Generator {
    // Generator state
    modelLoaded = false;
    generating = false;
    nextSeed = null;
    nextCallback = null;

    // Constants
    static defaultString = "Once upon a time ";
    static temperature = 0.7;
    static inputLength = 35;
    static outputLength = 35;

    async loadModel(name) {
        const modelPath = "models/hemingway/";
        this.modelLoaded = false;
        const self = this;
        this.rnn = ml5.charRNN(modelPath, (result) => {
            self.modelLoaded = true;
        });
        return(this.rnn.ready);
    }

    generate(seedInput, callback) {
        // Can't generate without a model
        if (!this.modelLoaded) callback(null);

        // If seed is empty, use a default string
        if (seedInput.length === 0) {
            callback(Generator.defaultString);
            return;
        }

        // Either queue it OR run it - garbled results with 2+ simultaneous generations
        if (this.generating) {
            this.nextSeed = seedInput;
            this.nextCallback = callback;
        } else {
            // Prepare seed: shorten input
            let seed = seedInput.substring(seedInput.length - Generator.inputLength);

            // Generate!
            this.generating = true;
            const data = {
                seed: seed,
                temperature: Generator.temperature,
                length: Generator.outputLength
            };
            const self = this;
            this.rnn.generate(data).then((generatedObj) => {
                self.generating = false;
                let generatedText = generatedObj.sample;

                // Replace all newlines with a space
                generatedText = generatedText.replace(/(\r\n|\n|\r)/gm, " ");

                // Consolidate multiple spaces into a single space
                generatedText = generatedText.replace(/\s+/g, ' ');

                // Hemingway wrote in a different time... oof
                if (generatedText.indexOf("nigg") >= 0) {
                    generatedText = generatedText.replace("nigg", "tig"); // tigers are ok
                }

                // Remove text after last space, so we only end with whole words
                const lastSpaceIndex = generatedText.lastIndexOf(" ");
                generatedText = generatedText.substring(0, lastSpaceIndex);


                // Only return data if there's nothing queued
                if (self.nextSeed) {
                    callback(null);
                    self.generate(self.nextSeed, self.nextCallback);
                    self.nextSeed = null;
                    self.nextCallback = null;
                } else if (callback) {
                    callback(generatedText);
                }
            });
        }
    }
}