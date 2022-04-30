export class Generator {
    static models = {
        "Hemingway": "models/hemingway/",
        "Shakespeare": "models/shakespeare/",
        "Dubois": "models/dubois/"
    };
    
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
            console.log(seed);
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
                    console.log(generatedObj);
                    callback(generatedText);
                }
            });
        }
    }
}