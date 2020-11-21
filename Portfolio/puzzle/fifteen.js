/* Henry Tran
	Javascript for fifteen puzzle
	Bonus implemented: End-of-game Notification
	View on site (https://students.washington.edu/henryvt/puzzle)
*/

(function(){
	'use strict';

	var openX = 300;
	var openY = 300;
	var completed = false;

	window.onload = function() {
		createPuzzle(15);
		document.getElementById('shufflebutton').onclick = shuffle;

		var allPieces = document.querySelectorAll('.piece');
        for (var i = 0; i < allPieces.length; i++) {
            allPieces[i].onmouseover = hover;
            allPieces[i].onmouseout = unhover;
            allPieces[i].onclick = move;
        }
	};

	//create the pieces of the puzzle, number the pieces and place background positioned correctly
	function createPuzzle(pieces) {
		var area = document.getElementById('puzzlearea');
		
		for (var i = 0; i < pieces; i++) {
			var newPiece = document.createElement('div');
      		var posY = Math.floor((i / 4)) * 100;
			var posX = (i % 4) * 100;

			newPiece.className = 'piece';
			newPiece.innerHTML = i + 1;
			newPiece.style.top = posY + 'px';
			newPiece.style.left = posX + 'px';
			newPiece.style.backgroundPosition = (-posX) + 'px ' + (-posY) + 'px';

			area.appendChild(newPiece);
		}
	}	

	//checks if the open space is next to the selected piece
	function isMovable(piece) {
		var x = parseInt(window.getComputedStyle(piece).left);
		var y = parseInt(window.getComputedStyle(piece).top);
		if (x == openX && (y == (openY + 100) || y == (openY - 100))) {
			return true;
		} else if (y == openY && (x == (openX + 100) || x == (openX - 100))) {
			return true;
		}
		return false;
	}

	//check if movable piece and move it
	function move() {
		if(isMovable(this)) {
			doMove(this);
			winCheck();
		}
	}

	//move the piece by switching xy pos with empty space
	function doMove(piece) {
		var posX = parseInt(window.getComputedStyle(piece).left);
		var posY = parseInt(window.getComputedStyle(piece).top);
		piece.style.left = openX + 'px';
		piece.style.top = openY + 'px';
		openX = posX;
		openY = posY;
	}

	//check if pieces match winning board then set output accordingly
	function winCheck(){
		completed = true;
		var won = winOrder();
        var allPieces = document.querySelectorAll(".piece");
        for (var j = 0; j < allPieces.length; j++) {
            var X = parseInt(window.getComputedStyle(allPieces[j]).left);
            var Y = parseInt(window.getComputedStyle(allPieces[j]).top);
            var piece = parseInt(allPieces[j].innerHTML) - 1;
            var wonX = won[piece][0];
            var wonY = won[piece][1];
            if (X !== wonX || Y !== wonY) {
                completed = false;
            }
        }

		if(completed) {
			var output = document.getElementById('output');
			var winner = document.createElement('p');
			winner.innerHTML = 'Congratulations Puzzle Solved! Shuffle and Play Again!';
			output.appendChild(winner);
			completed = false;
		} else {
			document.getElementById('output').innerHTML = '';
		}
	}

    //shuffle board
    function shuffle() {
    	document.getElementById('output').innerHTML = '';
		for (var i = 0; i < 1000; i++) {
			var neighbor = [];
			var allPieces = document.querySelectorAll('.piece');
			for (var j = 0; j < allPieces.length; j++) {
				if(isMovable(allPieces[j])) {
					neighbor.push(allPieces[j]);
				}
			}
			var random = parseInt(Math.random() * neighbor.length);
			doMove(neighbor[random]);
		}
	}

	//check if movable piece and highlight when hover
    function hover() {
    	if(isMovable(this)){
    		this.classList.add('hover');
    	}
    }
    //remove highlight when unhovered on
    function unhover() {
    	this.classList.remove('hover');
    }

    //find the winning order of board (close to createPuzzle, might need refactoring)
    function winOrder() {
        var output = [];
        for (var i = 0; i <= 14; i++) {
            var posY = Math.floor((i / 4)) * 100;
			var posX = (i % 4) * 100;
            output[i] = [posX, posY];
        }
        return output;
    }

})();