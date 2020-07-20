var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "pink";
ctx.fillRect(0, 0, canvas.width, canvas.height);


//Visuals
var lineLength = 10;

var finishedDrawing = false;

//Element references
var text = document.getElementById("textP");
var button = document.getElementById("mainButton");


//L-system
var axiom = "F";
var sentence = axiom;
var rules = [];
rules[0] = {
    rIf: "F",
    rThen: "FF+[+F-F-F]-[-F+F+F]"
}

function Generation(){
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++){
        var current = sentence.charAt(i);
        var found = false;
        for (var j = 0; j < rules.length; j++){
            if(current == rules[j].rIf){
                found = true;
                nextSentence += rules[j].rThen;
                break;
            }
        }
    }
    if(!found){
        nextSentence += current;
    }
    
    sentence = nextSentence;
    
    text.innerHTML = sentence;
    drawStepCount = 0;
    //DrawStep();
    
}

var drawStepCount = 0;
var startPoint = {x: ctx.width/2, y: ctx.height};
var currentCoordinate = startPoint;
function DrawStep(){
    if(drawStepCount == 0){}
    if(drawStepCount < sentence.length){
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        for(var i = 0; i < drawStepCount; i++){

            var current = sentence.charAt(i);
            switch(current){
                case "F":
                    currentCoordinate
                    ctx.lineTo(currentCoordinate)
                    //console.log("f");
                    break;
                case "+":
                    //console.log("+");
                    break;
                case "-":
                    //console.log("-");
                    break;
                case "[":
                    //console.log("[");
                    break;
                case "]":
                    //console.log("]");
                    break;
            }
        }
        ctx.stroke();
        drawStepCount++;
    }
}

function Init(){
    
}

window.requestAnimationFrame(LoopMain);
function LoopMain(){
    if(!finishedDrawing){
        DrawStep();
    }
    window.requestAnimationFrame(LoopMain);
}

Init();