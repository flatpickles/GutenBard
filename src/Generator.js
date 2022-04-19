export class Generator {
    static models = {
        "Hemingway": "models/hemingway/"
    };
    
    modelLoaded = false;
    temperature = 0.5;
    length = 30;

    async loadModel(name) {
        const modelPath = Generator.models[name];
        this.modelLoaded = false;
        const self = this;
        this.rnn = ml5.charRNN(modelPath, (result) => {
            self.modelLoaded = true;
        });
        return(this.rnn.ready);
    }

    async generate(seedInput) {
        if (this.modelLoaded) {
            const data = {
                seed: seedInput,
                temperature: this.temperature,
                length: this.length
            };
            // to do: Cancel earlier ones?
            return(this.rnn.generate(data));
        }
    }
}