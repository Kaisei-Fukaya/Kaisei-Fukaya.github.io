//Input Elements
var progressionLengthInput = document.getElementById("pLengthInput");
var includeDimInput = document.getElementById("pIncDimInput");
var useKeyInput = document.getElementById("pUseKeyInput");
var keyInput = document.getElementById("pKeyInput");

//Output Elements
var outputElement = document.getElementById("outputText");
var outputChordsElement = document.getElementById("outputChordsText");
var outputNumeralElement = document.getElementById("outputChordsNumeralsText");

//Constants
const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

//Handle expandable menu
var collapsibles = document.getElementsByClassName("collapsible");
for (var i = 0; i < collapsibles.length; i++){
    collapsibles[i].addEventListener("click", function(){
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if(content.style.maxHeight){
            content.style.maxHeight = null;
            content.style.maxWidth = 200 + "px";
            this.style.maxWidth = 200 + "px";
        }else{
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.maxWidth = 500 + "px";
            this.style.maxWidth = 500 + "px";
        }
    });
}

function GenerateResult(){
    //Generate Key
    var keyVal = 0;
    if(!useKeyInput.checked){
        keyVal = Math.floor(Math.random() * notes.length);
    }
    else{
        keyVal = parseInt(keyInput.value);
    }
    var genKey = notes[keyVal];
    var outputText = "Key: " + genKey + "<br>";
    var chordsKeyRelativeText = "";
    var chordsNumeralText = "";
    
    //Generate Progression
    var progLength = progressionLengthInput.value;
    var progression = [progLength];
    var lastChord;
    
    //Write Chords
    for (var i = 0; i < progLength; i++){
        //Audition new chord
        var auditioning = true;
        var chosenChord;
        var escapeCounter = 0;
        while(auditioning){
            chosenChord = GetRandomDiatonicChord();
            if(chosenChord != lastChord){
                auditioning = false;
            }
            escapeCounter++;
            if(escapeCounter > 10){
                auditioning = false;
            }
        }
        progression[i] = chosenChord;
        chordsNumeralText += GetNumeral(chosenChord) + " ";
        lastChord = chosenChord;
    }
    
    //Write Chords Relative to Key
    outputText += chordsNumeralText+"<br>";
    for (var i = 0; i < progression.length; i++){
        chordsKeyRelativeText += GetKeyRelativeDiatonic(keyVal, progression[i]) + " ";
    }
    outputText += chordsKeyRelativeText;
    
    outputElement.innerHTML = outputText;
    outputChordsElement.innerHTML = chordsKeyRelativeText;
    outputNumeralElement.innerHTML = chordsNumeralText;
}

function GetRandomDiatonicChord(){
    var out;
    var useDim = includeDimInput.checked;
    if(useDim == true){
        out = Math.floor(Math.random() * 7);
    }else{
        out = Math.floor(Math.random() * 6)
    }
    return out;
}

function GetNumeral(num){
    var chordOut = "";
    switch(num){
        case 0:
            chordOut = "I";
            break;
        case 1:
            chordOut = "ii";
            break;
        case 2:
            chordOut = "iii";
            break;
        case 3:
            chordOut = "IV";
            break;
        case 4:
            chordOut = "V";
            break;
        case 5:
            chordOut = "vi";
            break;
        case 6:
            chordOut = "vii"+"<sup>"+"o"+"</sup>";
            break;
    }
    return chordOut;
}

function GetKeyRelativeDiatonic(key, chordNum){
    var outChord = "";
    switch(chordNum){
        case 0:
            outChord = notes[key];
            break;
        case 1:
            outChord = notes[WrapVal(key + 2)] + "m";
            break;
        case 2:
            outChord = notes[WrapVal(key + 4)] + "m";
            break;
        case 3:
            outChord = notes[WrapVal(key + 5)];
            break;
        case 4:
            outChord = notes[WrapVal(key + 7)];
            break;
        case 5:
            outChord = notes[WrapVal(key + 9)] + "m";
            break;
        case 6:
            outChord = notes[WrapVal(key + 11)] + "dim";
            break;
    }
    return outChord;
}

function WrapVal(index){
    var outIndex;
    if(index > notes.length-1){
        outIndex = index - notes.length;
    }else{
        outIndex = index;
    }
    return outIndex;
}