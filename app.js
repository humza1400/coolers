// Create a generate colors function and return an array of these color codes
//   This function will also update the colors on the front-end.
//   * Use ES6 syntax here please.

// Create function that will listen for spacebar hit and call the generate colors function.
var changeColors = function() {
    for (var i = 0; i < 5; i++) {
        var col = document.getElementsByClassName("col")[i];
        col.style.background = colors[i];
        col.style.height = "90vh";
        col.style.outline = "0.4em solid black";
        col.style.fontFamily = "Courier";
        col.style.color = "black";
        col.innerHTML = "<h1>" + colors[i] + "</h1> <p>Click to copy!</p> ";
    }
} 

var colorGenerator = function*() {
    var colors = new Array(5)
    while(true) {
        for (var i = 0; i < colors.length; i++) {
            colors[i] = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
        yield colors;
    }
}

const colorGen = colorGenerator();

window.onload = function() {
    colors = colorGen.next().value;
    changeColors(colors);
}

document.addEventListener('click', event=> {
    for (var i = 0; i < 5; i++) {
        var colID = "col" + i;
        var col = document.getElementById(colID);
        var color = col.innerText;
        color = color.substring(0, color.indexOf("\n"));
        if (col.innerText.includes("Copied!")) {
            col.innerHTML = "<h1>" + color + "</h1> <p>Click to copy!</p> ";   
        }
        if (event.target.id == colID) {
            navigator.clipboard.writeText(color);
            col.innerHTML = "<h1>" + color + "</h1> <p>Copied!</p> ";
        }
    }
})

document.addEventListener('keyup', event=> {
    if (event.code == "Space") {
        colors = colorGen.next().value;
        changeColors();
    }
})


