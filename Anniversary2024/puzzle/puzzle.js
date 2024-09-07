// Ensure this code runs after the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Assign the confetti click handler
  const fireBtn = document.querySelector('.fire-btn');

  if (fireBtn) {
      fireBtn.addEventListener('click', fireConfetti);
  }
});
const puzzleContainer = document.getElementById('puzzle-container');
const solveButton = document.getElementById('almost-solve-btn');
let pieces = [];
const gridSize = 3;

// Confetti function to trigger the confetti effect
function fireConfetti() {
  const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['heart'],
      colors: ['FFC0CB', 'FF69B4', 'FF1493', 'C71585'],
  };

  // Trigger multiple confetti bursts
  confetti({ ...defaults, particleCount: 50, scalar: 2 });
  confetti({ ...defaults, particleCount: 25, scalar: 3 });
  confetti({ ...defaults, particleCount: 10, scalar: 4 });
}

// Initialize puzzle pieces
function initPuzzle() {
    // Create 8 pieces and 1 empty slot
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const index = row * gridSize + col;
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

            if (index === gridSize * gridSize - 1) {
                piece.classList.add('empty'); // Last piece is the empty slot
            } else {
                piece.dataset.index = index;
                piece.addEventListener('click', () => movePiece(piece));
            }

            pieces.push(piece);
            puzzleContainer.appendChild(piece);
        }
    }

    shufflePieces();
}

// Shuffle pieces randomly
function shufflePieces() {
    pieces.sort(() => Math.random() - 0.5);
    puzzleContainer.innerHTML = '';
    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Check if a piece can be moved
function canMovePiece(piece) {
    const emptyPiece = document.querySelector('.empty');
    const pieceIndex = Array.from(puzzleContainer.children).indexOf(piece);
    const emptyIndex = Array.from(puzzleContainer.children).indexOf(emptyPiece);
    const allowedMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - gridSize, emptyIndex + gridSize];

    return allowedMoves.includes(pieceIndex);
}

// Move the clicked piece to the empty slot
function movePiece(piece) {
    if (!canMovePiece(piece)) return;

    const emptyPiece = document.querySelector('.empty');
    const pieceIndex = Array.from(puzzleContainer.children).indexOf(piece);
    const emptyIndex = Array.from(puzzleContainer.children).indexOf(emptyPiece);

    // Swap pieces
    [pieces[pieceIndex], pieces[emptyIndex]] = [pieces[emptyIndex], pieces[pieceIndex]];
    puzzleContainer.innerHTML = '';
    pieces.forEach(piece => puzzleContainer.appendChild(piece));

    checkCompletion();
}

// Check if the puzzle is solved
function checkCompletion() {
    const currentOrder = pieces.map(piece => piece.dataset.index || 'empty').join();
    const correctOrder = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i).concat('empty').join();

    if (currentOrder === correctOrder) {
        fireConfetti();
        setTimeout(() => {
          window.location.href = '../AnniversaryUnlocked6.html'; // Redirect to the unlocked page
      }, 3000);
    }
}

// Arrange the puzzle one move away from being solved
function arrangeOneMoveAway() {
    pieces = pieces.sort((a, b) => (a.dataset.index || 9) - (b.dataset.index || 9));
    
    // Place the empty slot in the last position, and swap the last two pieces.
    const lastPieceIndex = gridSize * gridSize - 2;
    const emptyIndex = gridSize * gridSize - 1;

    // Swap second-to-last piece with the empty slot to make it solvable in one move
    [pieces[lastPieceIndex], pieces[emptyIndex - 1]] = [pieces[emptyIndex - 1], pieces[lastPieceIndex]];

    puzzleContainer.innerHTML = '';
    pieces.forEach(piece => puzzleContainer.appendChild(piece));
}

// Initialize the puzzle on page load
initPuzzle();

// Attach event to button to arrange the tiles one move away from solved
solveButton.addEventListener('click', arrangeOneMoveAway);
