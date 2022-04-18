import ML5 from "ml5";

export class Generator {
    static models = {
        "Hemingway": "models/hemingway/"
    };
    
    modelLoaded = false;
    temperature = 0.5;
    length = 30;

    loadModel(name) {
        const modelPath = Generator.models[name];
        this.modelLoaded = false;
        const self = this;
        this.rnn = ML5.charRNN(modelPath, (result) => {
            console.log(result);
            self.modelLoaded = true;
        });
    }

    generate(seedInput) {
        if (this.modelLoaded) {
            const data = {
                seed: seedInput,
                temperature: this.temperature,
                length: this.length
            };
            // to do: promisify? Cancel earlier ones?
            console.log(this.rnn.generate(data, (err, results) => {
                const oneLineResults = results.sample.replace(/(\r\n|\n|\r)/gm, "");
                modelOutput = seedInput + oneLineResults;
            }));
        }
    }
}