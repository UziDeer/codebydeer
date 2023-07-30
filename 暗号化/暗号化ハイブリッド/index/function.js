                                                //EnCode % DeCode;
let enVar = document.getElementById("enVar");   //before % before;
let about = document.getElementById("about");   //before % before;
let text = document.getElementById("text");     //before % result;
let info = document.getElementById("info");     //
let cancel = document.getElementById("cancel"); //
let canvas = document.getElementById("canvas"); //
let ctx = canvas.getContext("2d");              // hidden
try {
    let 
} catch (error) {
    
}
function EnFName(value) {
    downAnc.download = value += ".png";
}
function clear(massage) {
    if (massage != undefined) {
        about.innerText = massage;
    } else {
        about.innerText = "";
    }
    idFile.value = null;
    div.style.display = 'none';
    canvas.style.display = 'none';
    prog.style.display = 'none';
    cancel.style.display = 'none';
}