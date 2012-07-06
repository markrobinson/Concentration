// Copyright (c) 2012 Mark Robinson
// This code is licensed under MIT license (see LICENSE.txt for details)
// [github URL]

var game_number = 1;
// where each picture to match is on the board
var match_locations = [];
// keep track if a tile has been matched ('hidden','open','matched')
var match_status = [];
// queue of open tiles on the board
var openTiles = [];
// true if the game is in a state where a tile can be opened
var okToClick = true;

/**
* Starts a new game.
*/
function init() {
	for (var i = 0; i < 25; i++) {
		closeTile(i);
	}
	initTilePictureLocations();
}

/**
* Randomly fill the board with the pictures
* to be matched
*/
function initTilePictureLocations() {
	while (match_locations.length < 25) {
		// random number 0 - 12
		var random = Math.floor(Math.random() * 13).toString();
		var index = match_locations.indexOf(random);
		if (index == -1) {
			match_locations.push(random);
		} else if (random != '0') { // 0.png is the wild square
			//check to see if image has been added a second time
			var second_index = match_locations.indexOf(random, index + 1);
			if (second_index == -1) {
				match_locations.push(random);
			}
		}
	}
}

/**
* close the tile so the picutre is hidden
* blockNum 0-24 index on the board
*/
function closeTile(blockNum) {
	var canvas = document.getElementById("block" + blockNum);
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		// draw outer red box
		ctx.fillStyle = "#EE0000";
    	ctx.fillRect (0, 0, 200, 170);
		// draw inside yellow box
		ctx.fillStyle = "#FFFF00";
		ctx.strokeRect(5, 5, 190, 160);
		ctx.fillRect(5, 5, 190, 160);
		// draw number
		ctx.font = "bold 75px helvetica";
		ctx.fillStyle = "#4D4D4D";
		if (blockNum + 1 < 10) {
			ctx.fillText(blockNum + 1, 75, 110);
		} else {
			ctx.fillText(blockNum + 1, 55, 110);
		}		
	}
	match_status[blockNum] = 'hidden';
	return true;
}

/**
* onclick function from page canvas
* blockNum 0-24 index on the board
*/
function clickTile(blockNum) {
	if (match_status[blockNum] == 'hidden' && okToClick) {
		openTile(blockNum);
	}
}

/**
* open the tile to see the picture to match underneath 
* blockNum 0-24 index on the board
*/
function openTile(blockNum) {
	var canvas = document.getElementById("block" + blockNum);
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		match_status[blockNum] = 'open';		
		var img = new Image();
		img.onload = function(){ 				
			ctx.drawImage(img, 0, 0)
		}
		img.src = 'tiles/' + match_locations[blockNum] + '.png';			
		openTiles.push(blockNum);
		if (openTiles.length == 2) {
			okToClick = false;			
			setTimeout(function() {checkMatch();},2500);			
		}		
	}
}

/**
* check to see if the tiles in openTiles match, this method
* handels the wild card
*/
function checkMatch() {
	
	if (match_locations[openTiles[0]] == match_locations[openTiles[1]]) {
		// match found
		setTimeout(function() { openPuzzleTile(); }, 1000);
		setTimeout(function() { okToClick = openPuzzleTile(); }, 2000);
	} else if (match_locations[openTiles[0]] == '0') {
		// wild card match
		openWildCard(1);		
	} else if (match_locations[openTiles[1]] == '0') {
		// wild card match
		openWildCard(0);		
	} else {
		// no match 
		closeTile(openTiles[0]);
		okToClick = closeTile(openTiles[1]);
		openTiles.pop();
		openTiles.pop();		
	}
	
}

function openPuzzleTile() {
	showPuzzleTile(openTiles.pop());
	return true;
}

/**
* Clears a canvas tile to reveal the puzzle under the picture matched.
*/
function showPuzzleTile(blockNum) {
	var canvas = document.getElementById("block" + blockNum);
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 200, 170);
		match_status[blockNum] = 'matched';
	}	
}

function openWildCard(tile_index) {
	var index = match_locations.indexOf(match_locations[openTiles[tile_index]]);
	if (index == openTiles[tile_index]) {
		index = match_locations.indexOf(match_locations[openTiles[tile_index]], index + 1);
	} 
	openTile(index);
	setTimeout(function() { openPuzzleTile(); }, 3000);
	setTimeout(function() { openPuzzleTile(); }, 4000);
	setTimeout(function() { okToClick = openPuzzleTile(); }, 5000);
}

function showPuzzle() {
	for (var i = 0; i < 25; i++) {
		showPuzzleTile(i);
	}
}

function nextGame() {
	game_number++;
	match_locations = [];
	match_status = [];
	openTiles = [];
	okToClick = true;
	
	if (game_number > 7) {
		alert("No more puzzles!")
	} else {
		document.getElementById("puzzle").src = "puzzles/puzzle" + game_number + ".png";
		document.getElementById("gamenumber").innerHTML = game_number;
		init();
	}	
}
