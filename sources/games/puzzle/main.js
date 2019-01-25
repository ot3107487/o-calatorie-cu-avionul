let sthPlaying = true;
(function () {
    'use strict';
	$('#narator')[0].play();
	$('#narator')[0].onended = function() {
		sthPlaying = false;
	}
	$('#back-audio')[0].onended = function() {
		sthPlaying = false;
	}
	$('#succes')[0].onended = function() {
		sthPlaying = false;
	}
	$('#mai-incearca')[0].onended = function() {
		sthPlaying = false;
	}
	
	const dropZones = document.querySelectorAll('.dropzone');
    const puzPieceContainer = document.getElementById('puzzle-piece-container__container');
    const puzPieces = document.querySelectorAll('.puzzle-piece-container__puzzle-piece');
    const applauseSound = new Audio('sounds/applause.wav');
    let draggedPuzPiece;
    let puzSnapCounter = 0;
    var myArray = [
        "avion1",
        "avion2",
        "avion3"
    ];

    var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
    document.getElementById('puzzle-container__unsolved-puzzle').src = "../../assets/puzzle/images/" + randomItem + "/unpuzzle.png";
    document.getElementById('puzzle-container__solved-puzzle').src = "../../assets/puzzle/images/" + randomItem + "/puzzle.png";
    document.getElementById('piece01').src = "../../assets/puzzle/images/" + randomItem + "/Layer%202.png";
    document.getElementById('piece02').src = "../../assets/puzzle/images/" + randomItem + "/Layer%203.png";
    document.getElementById('piece03').src = "../../assets/puzzle/images/" + randomItem + "/Layer%204.png";
    document.getElementById('piece04').src = "../../assets/puzzle/images/" + randomItem + "/Layer%205.png";
    document.getElementById('piece05').src = "../../assets/puzzle/images/" + randomItem + "/Layer%206.png";


    /*--------------------
  PUZZLE COMPLETE AND PUZZLE SCRAMBLE FUNCTIONS
  --------------------*/
    //loop through dropzones, and puzz pieces
    const completePuzzle = function () {
        for (let i = 0; i < dropZones.length; i++) {
            for (let k = 0; k < puzPieces.length; k++) {
                //find matching id's and append each puzzle piece to the correct dropzone
                if (dropZones[i].id.slice(-2) === puzPieces[k].id.slice(-2)) {
                    puzPieces[k].parentNode.removeChild(puzPieces[k]);
                    dropZones[i].appendChild(puzPieces[k]);
                }
            }
        }
    };

    const scramblePuzzle = function () {
        for (let i = 0; i < puzPieces.length; i++) {
            puzPieces[i].parentNode.removeChild(puzPieces[i]);
            puzPieceContainer.appendChild(puzPieces[i]);
        }
        //randomize the order of the puzzle pieces in their container
        for (let k = puzPieceContainer.children.length; k >= 0; k--) {
            puzPieceContainer.appendChild(puzPieceContainer.children[(Math.random() * k) | 0]);
        }
    };

    //simulate elements shaking side to side
    const shakeEm = function () {
        for (let i = 0; i < puzPieces.length; i++) {
            puzPieces[i].classList.add('shake-em');
        }
    };

    //call the completePuzzle function on page load
    document.addEventListener('DOMContentLoaded', completePuzzle(), false);


    requestAnimationFrame(function () {
        puzPieceContainer.style.display = 'block';
    });
    scramblePuzzle();

    /*--------------------
  DRAG AND DROP LISTENERS
  --------------------*/
    /* events fired on the draggable target */
    document.addEventListener('drag', function (event) {
    }, false);

    document.addEventListener(
        'dragstart',
        function (event) {
            // store a ref. on the dragged elem
            draggedPuzPiece = event.target;
        },
        false
    );

    document.addEventListener(
        'dragend',
        function (event) {
            // reset the transparency
            requestAnimationFrame(function () {
                event.target.style.opacity = '';
            });
        },
        false
    );

    /* events fired on the drop targets */
    document.addEventListener(
        'dragover',
        function (event) {
            // prevent default to allow drop
            event.preventDefault();
        },
        false
    );

    document.addEventListener(
        'dragenter',
        function (event) {
            // do something to drop target when the draggable element enters it
            if (event.target.className == 'dropzone') {
            }
        },
        false
    );

    document.addEventListener(
        'dragleave',
        function (event) {
            // do something to drop target when dragged items leave it
            if (event.target.className == 'dropzone') {
            }
        },
        false
    );

    document.addEventListener(
        'drop',
        function (event) {
            // prevent default action (open as link for some elements)
            event.preventDefault();
            // move dragged elem to the selected drop target
            if (event.target.classList.contains('dropzone') && event.target.id.slice(-2) === draggedPuzPiece.id.slice(-2)) {
                requestAnimationFrame(function () {
                    event.target.style.background = '';
                    draggedPuzPiece.parentNode.removeChild(draggedPuzPiece);
                    event.target.appendChild(draggedPuzPiece);
                });

                puzSnapCounter += 1;
				if(!sthPlaying){
				$('#succes')[0].play();
				sthPlaying = true;
				}
				//puzzle complete do smth
                if (puzSnapCounter === 5) {
					sthPlaying = true;
                    $("#final")[0].play();
                    setTimeout(()=> window.location.reload(),6000);
                }

            } else {
				if(!sthPlaying){
				$('#mai-incearca')[0].play();
				sthPlaying = true;
			}}
        },
        false
    );
	$("#back").mouseenter(()=> {if(!sthPlaying){ $("#back-audio")[0].play(); sthPlaying = true;}});

})();
