var isHard = true;
var colors = generateRandomColors(6);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var correctGuess = document.getElementById("correctGuess");
var resetButton = document.getElementById("reset");
var easyButton = document.getElementById("easyButton");
var hardButton = document.getElementById("hardButton");


resetButton.addEventListener("click", function(){
	resetBoard();
});

easyButton.addEventListener("click", function(){
	easyButton.classList.add("selected");
	hardButton.classList.remove("selected");
	isHard = false;
	resetBoard();
});

hardButton.addEventListener("click", function(){
	hardButton.classList.add("selected");
	easyButton.classList.remove("selected");
	isHard = true;
	resetBoard();
});

colorDisplay.textContent = pickedColor;

function resetBoard(){
	// Change Button text
	resetButton.textContent = "New Colors"
	// Generate all new colors
	var numColors = isHard?6:3;

	colors = generateRandomColors(numColors);
	// Pick a new random color from array
	pickedColor = pickColor();
	// Change color display to match picked color
	colorDisplay.textContent = pickedColor;
	// Change colors of squares 
	for(var i=0;i<squares.length;i++){
		if(!isHard && i>2)
			squares[i].style.display = "none";
		else{
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
	}
	correctGuess.style.backgroundColor = "steelblue";
}

for(var i=0;i<squares.length;i++){
	// Add initial colors to squares.
	squares[i].style.backgroundColor = colors[i];

	// Add click listeners to squares.
	squares[i].addEventListener("click", function(){
		// Get color of clicked square
		var clickedColor = this.style.backgroundColor;
		//console.log(clickedColor, pickedColor);
		// Compare color to the picked color.
		if(clickedColor===pickedColor){
			changeColors(clickedColor);
			resetButton.textContent = "Play Again"
			correctGuess.style.backgroundColor = clickedColor;
			messageDisplay.textContent = "Correct!";
		}
		else{
			messageDisplay.textContent = "Wrong!";
			this.style.background = "#232323";
		}
	});
}

function changeColors(color){
	for(var i=0;i<squares.length;i++){
		squares[i].style.backgroundColor = color;
	}
}

function generateRandomColors(num){
	var arr = [];
	for(var i=0;i<num;i++){
		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){
	var red = Math.floor(Math.random()*256);
	var blue = Math.floor(Math.random()*256);
	var green = Math.floor(Math.random()*256);
	var rgb = "rgb("+red+", "+green+", "+blue+")";
	return rgb;
}

function pickColor(){
	var index =  Math.floor(Math.random()*colors.length);
	return colors[index];
}

