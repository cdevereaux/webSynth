var audioCtx = null;

async function InitializeAudio() {
    if (!audioCtx) {
        audioCtx = new AudioContext();
        console.log("AudioContext Initialized.")
        await audioCtx.audioWorklet.addModule("NoiseProcessor.js");
        InitializeKeyboard();
        InitializeOctaveControls();
        
        InitializeGraph();
        console.log("Graph Initialized.")
        document.getElementById("overlay").style.display = "none";
    }
}

