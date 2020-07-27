//Input Elements
var progressionLengthInput = document.getElementById("pLengthInput");
var includeDimInput = document.getElementById("pIncDimInput");
var useKeyInput = document.getElementById("pUseKeyInput");
var keyInput = document.getElementById("pKeyInput");

//Output Elements
var outputKeyElement = document.getElementById("outputKeyText");
var outputChordsElement = document.getElementById("outputChordsText");
var outputNumeralElement = document.getElementById("outputChordsNumeralsText");

//Constants
const notes = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

const notesSharps = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

//Handle expandable menu
var collapsibles = document.getElementsByClassName("collapsible");
for (var i = 0; i < collapsibles.length; i++){
    collapsibles[i].addEventListener("click", function(){
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if(content.style.maxWidth){
            content.style.maxWidth = null;
            //content.style.maxWidth = 200 + "px";
            //this.style.maxWidth = 200 + "px";
        }else{
            content.style.maxWidth = /*content.scrollWidth*/300 + "px";
            //content.style.maxWidth = 500 + "px";
            //this.style.maxWidth = 500 + "px";
        }
    });
}

//Handle keyboard inputs
window.addEventListener("keydown", function(event){
    if(event.defaultPrevented){
        return;
    }
    //console.log("key detected");
    switch(event.code){
        case "Space":
            GenerateResult();
            event.preventDefault();
            break;
    }
    
}, true);


//Handle progression length number
var slider = document.getElementById("pLengthInput"),
    sliderNumber = document.getElementById("progLengthNumber");

slider.oninput = function(){
    sliderNumber.innerHTML = this.value;
    var leftVal = 20;
    switch(parseInt(this.value)){
        case 1:
            leftVal = 20;
            break;
        case 2:
            leftVal = 48;
            break;
        case 3:
            leftVal = 77;
            break;
        case 4:
            leftVal = 103;
            break;
        case 5:
            leftVal = 132;
            break;
        case 6:
            leftVal = 159;
            break;
        case 7:
            leftVal = 188;
            break;
        case 8:
            leftVal = 215;
            break;
        case 9:
            leftVal = 242;
            break;
        case 10:
            leftVal = 266;
            break;
    }
    sliderNumber.style.left = leftVal + "px";
}

//Main Code
var chordsKeyRelativeText = "";
var chordsNumeralText = "";
var progression = [0,1,2,3,4,5,6];
var keyVal = 0;
var modeVal = 0;
var modeText = "Major (Ionian)";


function GenerateResult(){
    //Generate Key
    keyVal = 0;
    if(useKeyInput.checked){
        keyVal = Math.floor(Math.random() * notes.length);
        keyVal = Math.floor(Math.random() * notes.length);
    }
    else{
        keyVal = parseInt(keyInput.value);
    }
    //chordsKeyRelativeText = "";
    chordsNumeralText = "";
    
    SetKey(keyVal);
    
    //Generate Progression
    progression = new Array(parseInt(progressionLengthInput.value));
    
    //Write Chords
    GenProgression();
    
    //Write Chords Relative to Key
    WriteKeySpecificChords();
    
    //console.log(outputKeyElement.innerHTML);
    outputNumeralElement.innerHTML = chordsNumeralText;
}

function SetKey(setKeyVal){
    keyVal = setKeyVal;
    outputKeyElement.innerHTML = KeyToText() + " <span style='font-size: 1ex'>" + modeText + "</span>";
}

function SetMode(setModeVal){
    modeVal = setModeVal;
    switch(modeVal){
        case 0:
            modeText = "Major (Ionian)";
            break;
        case 1:
            modeText = "Dorian";
            break;
        case 2:
            modeText = "Phrygian";
            break;
        case 3:
            modeText = "Lydian";
            break;
        case 4:
            modeText = "Mixolydian";
            break;
        case 5:
            modeText = "Minor (Aeolian)";
            break;
        case 6:
            modeText = "Locrian";
            break;
    }
    outputKeyElement.innerHTML = KeyToText() + " <span style='font-size: 1ex'>" + modeText + "</span>";
}

function KeyToText(){
    return out = notes[keyVal].toString();
}

function GenProgression(){
    var lastChord;
    for (var i = 0; i < progression.length; i++){
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
        //chordsNumeralText += GetNumeral(chosenChord) + " ";
        lastChord = chosenChord;
    }
    WriteNumerals();
}

function WriteNumerals(){
    chordsNumeralText = "";
    for (var i = 0; i < progression.length; i++){
        chordsNumeralText += GetNumeral(progression[i]) + " ";
    }
    outputNumeralElement.innerHTML = chordsNumeralText;
}

function WriteKeySpecificChords(){
    chordsKeyRelativeText = "";
    for (var i = 0; i < progression.length; i++){
        chordsKeyRelativeText += GetKeyRelativeDiatonic(keyVal, progression[i]) + " ";
        //console.log("keyval: "+keyVal);
    }
    outputChordsElement.innerHTML = chordsKeyRelativeText;
    //console.log("2");
}

function GetRandomDiatonicChord(){
    var out;
    var useDim = includeDimInput.checked;
    if(useDim == true){
        out = Math.floor(Math.random() * 7);
    }else{
        var ranVal = 0;
        var accepted = false;
        while(!accepted){
            ranVal = Math.floor(Math.random() * 7);
            accepted = CheckIfHitDim(ranVal);
            //console.log("1 accepted: " + accepted);
        }
        out = ranVal;
        //console.log("2");
    }
    return out;
}

function CheckIfHitDim(rv){
    switch(modeVal){
        case 0:
            if(rv == 6){
                return false;
            }else{
                return true;
            }
            break;
        case 1:
            if(rv == 5){
                return false;
            }else{
                return true;
            }
            break;
        case 2:
            if(rv == 4){
                return false;
            }else{
                return true;
            }
            break;
        case 3:
            if(rv == 3){
                return false;
            }else{
                return true;
            }
            break;
        case 4:
            if(rv == 2){
                return false;
            }else{
                return true;
            }
            break;
        case 5:
            if(rv == 1){
                return false;
            }else{
                return true;
            }
            break;
        case 6:
            if(rv == 0){
                return false;
            }else{
                return true;
            }
            break;
    }
}

var dimSymbol = "<sup>o</sup>";
function GetNumeral(num){
    var chordOut = "";
    switch(num){
        case 0:
            switch(modeVal){
                case 0:
                    chordOut = "I";
                    break;
                case 1:
                    chordOut = "i";
                    break;
                case 2:
                    chordOut = "i";
                    break;
                case 3:
                    chordOut = "I";
                    break;
                case 4:
                    chordOut = "I";
                    break;
                case 5:
                    chordOut = "i";
                    break;
                case 6:
                    chordOut = "i"+dimSymbol;
                    break;
            }
            break;
        case 1:
            switch(modeVal){
                case 0:
                    chordOut = "ii";
                    break;
                case 1:
                    chordOut = "ii";
                    break;
                case 2:
                    chordOut = "bII";
                    break;
                case 3:
                    chordOut = "II";
                    break;
                case 4:
                    chordOut = "ii";
                    break;
                case 5:
                    chordOut = "ii"+dimSymbol;
                    break;
                case 6:
                    chordOut = "bII";
                    break;
            }
            break;
        case 2:
            switch(modeVal){
                case 0:
                    chordOut = "iii";
                    break;
                case 1:
                    chordOut = "bIII";
                    break;
                case 2:
                    chordOut = "bIII";
                    break;
                case 3:
                    chordOut = "iii";
                    break;
                case 4:
                    chordOut = "iii"+dimSymbol;
                    break;
                case 5:
                    chordOut = "bIII";
                    break;
                case 6:
                    chordOut = "biii";
                    break;
            }
            break;
        case 3:
            switch(modeVal){
                case 0:
                    chordOut = "IV";
                    break;
                case 1:
                    chordOut = "IV";
                    break;
                case 2:
                    chordOut = "iv";
                    break;
                case 3:
                    chordOut = "#iv"+dimSymbol;
                    break;
                case 4:
                    chordOut = "IV";
                    break;
                case 5:
                    chordOut = "iv";
                    break;
                case 6:
                    chordOut = "iv";
                    break;
            }
            break;
        case 4:
            switch(modeVal){
                case 0:
                    chordOut = "V";
                    break;
                case 1:
                    chordOut = "v";
                    break;
                case 2:
                    chordOut = "v"+dimSymbol;
                    break;
                case 3:
                    chordOut = "V";
                    break;
                case 4:
                    chordOut = "v";
                    break;
                case 5:
                    chordOut = "v";
                    break;
                case 6:
                    chordOut = "bV";
                    break;
            }
            break;
        case 5:
            switch(modeVal){
                case 0:
                    chordOut = "vi";
                    break;
                case 1:
                    chordOut = "vi"+dimSymbol;
                    break;
                case 2:
                    chordOut = "bVI";
                    break;
                case 3:
                    chordOut = "vi";
                    break;
                case 4:
                    chordOut = "vi";
                    break;
                case 5:
                    chordOut = "bVI";
                    break;
                case 6:
                    chordOut = "bVI";
                    break;
            }
            break;
        case 6:
            switch(modeVal){
                case 0:
                    chordOut = "vii"+dimSymbol;
                    break;
                case 1:
                    chordOut = "bVII";
                    break;
                case 2:
                    chordOut = "bvii";
                    break;
                case 3:
                    chordOut = "vii";
                    break;
                case 4:
                    chordOut = "bVII";
                    break;
                case 5:
                    chordOut = "bVII";
                    break;
                case 6:
                    chordOut = "bvii";
                    break;
            }
            break;
    }
    return chordOut;
}

function GetKeyRelativeDiatonic(key, chordNum){
    var outChord = "";
    switch(chordNum){
        case 0:
            switch(modeVal){
                case 0:
                    outChord = notes[key];
                    break;
                case 1:
                    outChord = notes[key] + "m";
                    break;
                case 2:
                    outChord = notes[key] + "m";
                    break;
                case 3:
                    outChord = notes[key];
                    break;
                case 4:
                    outChord = notes[key];
                    break;
                case 5:
                    outChord = notes[key] + "m";
                    break;
                case 6:
                    outChord = notes[key] + "dim";
                    break;
            }
            break;
        case 1:
            switch(modeVal){
                case 0:
                    outChord = notes[WrapVal(key + 2)] + "m";
                    break;
                case 1:
                    outChord = notes[WrapVal(key + 2)] + "m";
                    break;
                case 2:
                    outChord = notes[WrapVal(key + 1)];
                    break;
                case 3:
                    outChord = notes[WrapVal(key + 2)];
                    break;
                case 4:
                    outChord = notes[WrapVal(key + 2)] + "m";
                    break;
                case 5:
                    outChord = notes[WrapVal(key + 2)] + "dim";
                    break;
                case 6:
                    outChord = notes[WrapVal(key + 1)];
                    break;
            }
            break;
        case 2:
            switch(modeVal){
                case 0:
                    outChord = notes[WrapVal(key + 4)] + "m";
                    break;
                case 1:
                    outChord = notes[WrapVal(key + 3)];
                    break;
                case 2:
                    outChord = notes[WrapVal(key + 3)];
                    break;
                case 3:
                    outChord = notes[WrapVal(key + 4)] + "m";
                    break;
                case 4:
                    outChord = notes[WrapVal(key + 4)] + "dim";
                    break;
                case 5:
                    outChord = notes[WrapVal(key + 3)];
                    break;
                case 6:
                    outChord = notes[WrapVal(key + 3)] + "m";
                    break;
            }
            break;
        case 3:
            switch(modeVal){
                case 0:
                    outChord = notes[WrapVal(key + 5)];
                    break;
                case 1:
                    outChord = notes[WrapVal(key + 5)];
                    break;
                case 2:
                    outChord = notes[WrapVal(key + 5)] + "m";
                    break;
                case 3:
                    outChord = notes[WrapVal(key + 6)] + "dim";
                    break;
                case 4:
                    outChord = notes[WrapVal(key + 5)];
                    break;
                case 5:
                    outChord = notes[WrapVal(key + 5)] + "m";
                    break;
                case 6:
                    outChord = notes[WrapVal(key + 5)] + "m";
                    break;
            }
            break;
        case 4:
            switch(modeVal){
                case 0:
                    outChord = notes[WrapVal(key + 7)];
                    break;
                case 1:
                    outChord = notes[WrapVal(key + 7)] + "m";
                    break;
                case 2:
                    outChord = notes[WrapVal(key + 7)] + "dim";
                    break;
                case 3:
                    outChord = notes[WrapVal(key + 7)];
                    break;
                case 4:
                    outChord = notes[WrapVal(key + 7)] + "m";
                    break;
                case 5:
                    outChord = notes[WrapVal(key + 7)] + "m";
                    break;
                case 6:
                    outChord = notes[WrapVal(key + 6)];
                    break;
            }
            break;
        case 5:
            switch(modeVal){
                case 0:
                    outChord = notes[WrapVal(key + 9)] + "m";
                    break;
                case 1:
                    outChord = notes[WrapVal(key + 9)] + "dim";
                    break;
                case 2:
                    outChord = notes[WrapVal(key + 8)];
                    break;
                case 3:
                    outChord = notes[WrapVal(key + 9)] + "m";
                    break;
                case 4:
                    outChord = notes[WrapVal(key + 9)] + "m";
                    break;
                case 5:
                    outChord = notes[WrapVal(key + 8)];
                    break;
                case 6:
                    outChord = notes[WrapVal(key + 8)];
                    break;
            }
            break;
        case 6:
            switch(modeVal){
                case 0:
                    outChord = notes[WrapVal(key + 11)] + "dim";
                    break;
                case 1:
                    outChord = notes[WrapVal(key + 10)];
                    break;
                case 2:
                    outChord = notes[WrapVal(key + 10)] + "m";
                    break;
                case 3:
                    outChord = notes[WrapVal(key + 11)] + "m";
                    break;
                case 4:
                    outChord = notes[WrapVal(key + 10)];
                    break;
                case 5:
                    outChord = notes[WrapVal(key + 10)];
                    break;
                case 6:
                    outChord = notes[WrapVal(key + 10)] + "m";
                    break;
            }
            break;
    }
    //console.log("Key: "+key + " chordnum: " + chordNum);
    return outChord;
}

function WrapVal(index){
    var outIndex = "";
    if(index > notes.length-1){
        outIndex = index - notes.length;
    }else{
        outIndex = index;
    }
    //console.log("wrapval: "+outIndex + " inputindex: "+index);
    return outIndex;
}

function KeyChanged(k){
    SetKey(parseInt(k));
    WriteKeySpecificChords();
}

function ModeChanged(m){
    SetMode(parseInt(m));
    WriteKeySpecificChords();
    WriteNumerals();
}