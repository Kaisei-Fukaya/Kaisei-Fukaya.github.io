 
var canvas = document.getElementById("characterSheet");
var ctx = canvas.getContext("2d");
var openToggleButton = document.getElementById("openToggleButton");


var isOpen = true;

function initialise(){
    canvas.style.width = "100%";
    canvas.style.height = "300px";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.style.outline = "1px solid black";
    openToggleButton.addEventListener("click", openToggle);
    console.log("hgasjhgjksg");
}

function openToggle(){
    isOpen = !isOpen;
    if(isOpen){
        //open
        canvas.style.maxHeight = canvas.style.height;
        canvas.style.display = "visible";
        canvas.style.outline = "1px solid black";
/*        console.log("open");*/
    }
    else{
        //close
        canvas.style.maxHeight = 0;
        canvas.style.display = "hidden";
        canvas.style.outline = "none";
/*        console.log("close");*/
    }
}


initialise();
openToggle();

