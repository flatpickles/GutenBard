export class Generator {
    static models = {
        "Hemingway": "models/hemingway/"
    };
    
    // Parameters
    temperature = 0.5;
    inputLength = 30;
    outputLength = 30;

    // Generator state
    modelLoaded = false;
    generating = false;
    nextSeed = null;
    nextCallback = null;

    async loadModel(name) {
        const modelPath = Generator.models[name];
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

        // Either queue it OR run it
        if (this.generating) {
            this.nextSeed = seedInput;
            this.nextCallback = callback;
        } else {
            // Prepare seed: shorten input & start with a full word
            let seed = seedInput.substring(seedInput.length - this.inputLength);
            seed = seed.substring(seed.indexOf(" ") + 1);

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
                const generatedText = generatedObj.sample.replace(/(\r\n|\n|\r)/gm, "");

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