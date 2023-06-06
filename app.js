// Create a generate colors function and return an array of these color codes
//   This function will also update the colors on the front-end.
//   * Use ES6 syntax here please.

// Create function that will listen for spacebar hit and call the generate colors function.

var changeColors = function() {
    for (var i = 0; i < 5; i++) {
        var col = $("#col" + i);
        var h1 = $("#col" + i + " h1");
        var p1 = $("#col" + i + " p");
        col.css(
            {
                "background-color": colors[i],
                "height": "90vh",
                "outline": "0.4em solid black",
                "fontFamily": "Courier",
                "color": "Black"
            });
        h1.text(colors[i]);
        p1.text("Click to copy!");
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

$(document).on('click', event=> {
    for (var i = 0; i < 5; i++) {
        var colID = "col" + i;
        var col = $("#" + colID);
        var h1 = $("#" + colID + " h1");
        var p1 = $("#" + colID + " p");
        var color = h1.text();
        if (col.text().includes("Copied!")) {
            h1.text(color);
            p1.text("Click to copy!");
        }
        if (event.target.id == colID) {
            navigator.clipboard.writeText(color);
            h1.text(color);
            p1.text("Copied!");
        }
    }
})

$(document).on('keyup', event=> {
    if (event.code == "Space") {
        colors = colorGen.next().value;
        changeColors();
    }
})


