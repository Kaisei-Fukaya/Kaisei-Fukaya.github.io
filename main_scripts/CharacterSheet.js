class CharacterSheet{
    
    #canvas;
    #ctx;
    #openToggleButton;


    #isOpen = true;
    
    constructor(canvasElement, toggleButton){
        this.#canvas = canvasElement;
        this.#ctx = this.#canvas.getContext("2d");
        this.#openToggleButton = toggleButton;
    }

    initialise(){
        this.#canvas.style.width = "100%";
        this.#canvas.style.height = "300px";
        this.#canvas.width = this.#canvas.offsetWidth;
        this.#canvas.height = this.#canvas.offsetHeight;
        this.#canvas.style.outline = "1px solid black";
        this.#openToggleButton.addEventListener("click", this.openToggle);
        console.log("hgasjhgjksg");
    }

    openToggle(){
        this.#isOpen = !this.#isOpen;
        if(this.#isOpen){
            //open
            this.#canvas.style.maxHeight = this.#canvas.style.height;
            this.#canvas.style.display = "visible";
            this.#canvas.style.outline = "1px solid black";
    /*        console.log("open");*/
        }
        else{
            //close
            this.#canvas.style.maxHeight = 0;
            this.#canvas.style.display = "hidden";
            this.#canvas.style.outline = "none";
    /*        console.log("close");*/
        }
    }
}

var csMain = new CharacterSheet(document.getElementById("characterSheet"), document.getElementById("openToggleButton"));
csMain.initialise();
csMain.openToggle();

