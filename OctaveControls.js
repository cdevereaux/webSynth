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
    
    let plusButton = document.createElement('button');
    plusButton.addEventListener('click', OctaveUp);
    plusButton.textContent = '+';
    octaveSelector.appendChild(plusButton);
    
    let octaveText = document.createElement('div');
    octaveText.id = "octaveText";
    octaveText.textContent = OCTAVE;
    octaveSelector.appendChild(octaveText);

    let minusButton = document.createElement('button');
    minusButton.addEventListener('click', OctaveDown);
    minusButton.textContent = '-';
    octaveSelector.appendChild(minusButton);
}
    
    
    
    