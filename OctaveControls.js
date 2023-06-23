var OCTAVE = 4;

function UpdateOctaveText() {
    document.getElementById("octaveText").textContent = OCTAVE;
}

function OctaveUp() {
    OCTAVE += 1;
    UpdateOctaveText();
}

function OctaveDown() {
    OCTAVE -= 1;
    UpdateOctaveText();
}

function InitializeOctaveControls() {
    let octaveSelector = document.getElementById("octaveSelector");
    
    let octaveLabel = document.createElement("div");
    octaveLabel.id = "octaveLabel";
    octaveLabel.textContent = "Octave: ";
    octaveSelector.appendChild(octaveLabel);
    let octaveControls = document.createElement("div");
    octaveControls.id = "octaveControls";
    octaveSelector.appendChild(octaveControls);
    
    
    let plusButton = document.createElement('button');
    plusButton.addEventListener('click', OctaveUp);
    plusButton.textContent = '+';
    octaveControls.appendChild(plusButton);
    
    let octaveText = document.createElement('div');
    octaveText.id = "octaveText";
    octaveText.textContent = OCTAVE;
    octaveControls.appendChild(octaveText);

    let minusButton = document.createElement('button');
    minusButton.addEventListener('click', OctaveDown);
    minusButton.textContent = '-';
    octaveControls.appendChild(minusButton);
}
    
    
    
    