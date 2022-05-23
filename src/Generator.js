export class Generator {
    // Parameters
    temperature = 1;
    inputLength = 30;
    outputLength = 30;

    // Generator state
    modelLoaded = false;
    generating = false;
    nextSeed = null;
    nextCallback = null;

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

        if (seedInput.length === 0) {
            callback("Once upon a time ");
            return;
        }

        // Either queue it OR run it - garbled results with 2+ simultaneous generations
        if (this.generating) {
            this.nextSeed = seedInput;
            this.nextCallback = callback;
        } else {
            // Prepare seed: shorten input
            let seed = seedInput.substring(seedInput.length - this.inputLength);

            // Generate!
            this.generating = true;
            const data = {
                seed: seed,
                temperature: this.temperature,
                length: this.outputLength
            };
            const self = this;
            this.rnn.generate(data).then((generatedObj) => {
                self.generating = false;
                const generatedText = generatedObj.sample.replace(/(\r\n|\n|\r)/gm, " ");

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