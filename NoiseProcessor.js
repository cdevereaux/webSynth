class NoiseProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, params) {
        for (let i = 0; i < outputs[0].length; i++) {
            for (let j = 0; j < outputs[0][i].length; j++) {
                outputs[0][i][j] = 2 * Math.random() - 1;
            }
        }
        return true; //keeps node alive
    }
}
registerProcessor("NoiseProcessor", NoiseProcessor);
console.log("loaded Noise Processor.")