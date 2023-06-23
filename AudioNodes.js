const Envelopes = new Set();
const Oscillators = new Set();

function setIndex(interface, index) {
    interface.index = index;
}

class AudioInterface extends BaklavaJS.Core.NodeInterface {
    constructor(name, index) {
        super(name, 0);
        this.use(setIndex, index);
        const multi = BaklavaJS.Engine.allowMultipleConnections;
        this.use(multi);
    }
}

class AbstactAudioNode extends BaklavaJS.Core.Node {
    constructor() {
        super();
        this.type = "AbstractAudioNode";
        this.audioNode = null;
        this.inputs = {};
        this.outputs = {};
    }
    calculate() {
        return this.outputs;
    }
}

class Osc extends AbstactAudioNode {
    constructor() {
        super();
        this.type = "Osc";
        this.title = this.type;

        this.osc = audioCtx.createOscillator();
        this.audioNode = audioCtx.createGain();
        this.osc.connect(this.audioNode);
        this.osc.start();

        this.inputs = {
            detune: new BaklavaJS.RendererVue.NumberInterface("Detune", 0).setPort(false)
        };

        this.outputs = {
            out: new AudioInterface("Output", 0)
        }

        this.initializeIo();
        Oscillators.add(this.id);
    }

    onDestroy() {
        Oscillators.delete(this.id);
    }

    calculate(inputs) {
        this.osc.detune.value = inputs.detune;
        return this.outputs;
    }
}

class Out extends AbstactAudioNode {
    constructor() {
        super();
        this.type = "Out";
        this.title = this.type;
        this.audioNode = audioCtx.destination;
        this.inputs = {
            input: new AudioInterface("Input", 0)
        };
        this.initializeIo();
    }
}

class Gain extends AbstactAudioNode {
    constructor() {
        super();
        this.type = "Gain";
        this.title = this.type;
        this.audioNode = audioCtx.createGain();
        this.inputs = {
            input: new AudioInterface("Input", 0),
            gain: new BaklavaJS.RendererVue.NumberInterface("Gain", 1.0, 0.001, 1.0).setPort(false)
        };
        this.outputs = {
            output: new AudioInterface("Output", 0)
        }
        this.initializeIo();
    }

    calculate(inputs) {
        this.audioNode.gain.value = inputs.gain;
        return this.outputs;
    }
}




class Noise extends AbstactAudioNode {
    constructor() {
        super();
        this.type = "Noise";
        this.title = this.type;

        this.audioNode = new AudioWorkletNode(
            audioCtx,
            "NoiseProcessor"
        );

        this.outputs = {
            out: new AudioInterface("Output", 0)
        }

        this.initializeIo();
    }

}


class Envelope extends AbstactAudioNode {
    constructor() {
        super();
        this.type = "ADSR Envelope";
        this.title = this.type;

        this.attack = 100;
        this.decay = 100;
        this.sustain = 0.5;
        this.release = 100;

        this.audioNode = new GainNode(audioCtx, {gain: 0.0})

        this.inputs = {
            input: new AudioInterface("Input", 0),
            attack: new BaklavaJS.RendererVue.NumberInterface("Attack (ms)", this.attack, 1).setPort(false),
            decay: new BaklavaJS.RendererVue.NumberInterface("Decay (ms)", this.decay, 1).setPort(false),
            sustain: new BaklavaJS.RendererVue.NumberInterface("Sustain Level", this.sustain, 0.001, 1.0).setPort(false),
            release: new BaklavaJS.RendererVue.NumberInterface("Release (ms)", this.release, 1).setPort(false)
        };

        this.outputs = {
            out: new AudioInterface("Output", 0)
        }

        this.initializeIo();
        Envelopes.add(this.id);
    }

    onDestroy() {
        Envelopes.delete(this.id);
    }

    calculate(inputs) {
        this.attack = inputs.attack;
        this.decay = inputs.decay;
        this.sustain = inputs.sustain;
        this.release = inputs.release;
        return this.outputs;
    }
}