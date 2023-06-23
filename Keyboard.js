function MidiNumToHertz(num) {
    return 440 * (2 ** ( ( num - 69) / 12 ) );
}

function NoteOn(noteNumber) {
    console.log("NoteOn")
    Envelopes.forEach( (nodeId) => {
        const env = editor.graph.findNodeById(nodeId);
        if (!env) {
            Envelopes.delete(nodeId);
            return;
        }
        const attackEndTime = audioCtx.currentTime + env.attack / 1000;
        const decayEndTime = attackEndTime + env.decay / 1000;
        env.audioNode.gain.linearRampToValueAtTime(1.0, attackEndTime);
        env.audioNode.gain.linearRampToValueAtTime(env.sustain, decayEndTime);
    });
    Oscillators.forEach( (nodeId) => {
        const node = editor.graph.findNodeById(nodeId);
        if (!node) {
            Oscillators.delete(nodeId);
            return;
        }
        node.osc.frequency.value = MidiNumToHertz(noteNumber + 12 * OCTAVE);
    });
}

function NoteOff(noteNumber) {
    console.log("NoteOff")
    Envelopes.forEach( (nodeId) => {
        const env = editor.graph.findNodeById(nodeId);
        if (!env) {
            Envelopes.delete(nodeId);
            return;
        }
        env.audioNode.gain.cancelScheduledValues(audioCtx.currentTime);
        env.audioNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + env.release / 1000);
    });
}


function MouseNoteOn(event) {
    if (event.buttons != 1) return;
    NoteOn(this.noteNumber);
}

function MouseNoteOff(event) {
    NoteOff(this.noteNumber);
}

const QWERTY_ROW = [
    "KeyQ", "KeyW", "KeyE", "KeyR",
    "KeyT", "KeyY", "KeyU", "KeyI",
    "KeyO", "KeyP", "BracketLeft", "BracketRight"
];

function KeyboardNoteOn(event) {
    let noteNumber;
    if ( (noteNumber = QWERTY_ROW.indexOf(event.code)) != -1) {
        NoteOn(noteNumber);
    }
    else if (event.code == "Minus") {
        OctaveDown();
    }
    else if (event.code == "Equal") {
        OctaveUp();
    }
}

function KeyboardNoteOff(event) {
    let noteNumber;
    if ( (noteNumber = QWERTY_ROW.indexOf(event.code)) != -1) {
        NoteOff(noteNumber);
    }
}

function InitializeKeyboard() {
    let keyboard = document.getElementById("keyboard");

    for (let i = 0; i < 12; i++) {
        let newKey = document.createElement('button');
        newKey.className = ( ( i==1 || i==3 || i==6 || i==8 || i==10 ) ? "black" : "white") + " key";
        newKey.noteNumber = i;
        newKey.addEventListener("mousedown", MouseNoteOn, false);
        newKey.addEventListener("mouseover", MouseNoteOn, false);
        newKey.addEventListener("mouseup", MouseNoteOff, false);
        newKey.addEventListener("mouseout", MouseNoteOff, false);
        keyboard.appendChild(newKey);
    }

    document.addEventListener('keydown', KeyboardNoteOn);
    document.addEventListener('keyup', KeyboardNoteOff);
}

