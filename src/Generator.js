export class Generator {
    static models = {
        "Hemingway": "models/hemingway/"
    };
    
    modelLoaded = false;
    temperature = 0.5;
    inputLength = 30;
    outputLength = 30;


    async loadModel(name) {
        const modelPath = Generator.models[name];
        this.modelLoaded = false;
        const self = this;
        this.rnn = ml5.charRNN(modelPath, (result) => {
            self.modelLoaded = true;
        });
        return(this.rnn.ready);
    }

    generate(seedInput, id, callback) {
        if (this.modelLoaded) {
            // Prepare seed: shorten input & start with a full word
            let seed = seedInput.substring(seedInput.length - this.inputLength);
            seed = seed.substring(seed.indexOf(" ") + 1);

            // Generate!
            const data = {
                seed: seed,
                temperature: this.temperature,
                length: this.outputLength
            };
            this.rnn.generate(data).then((generatedObj) => {
                const generatedText = generatedObj.sample.replace(/(\r\n|\n|\r)/gm, "");
                if (callback) callback(generatedText, id);
            });
        } else if (callback) {
            callback(null, id);
        }
    }
}