const landingPage = document.querySelector('.landing-page');
const startButton = document.querySelector('#startButton');
const puzzleContainer = document.querySelector('.puzzle-container');
const moves = document.querySelector('.moves');
const puzzle = document.querySelector('.puzzle');
let currentElement = "";
let movesCount = 0;
let imagesArr = [];

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};

// Random number for image
const randomNumber = () => Math.floor(Math.random() * 8) + 1;

// Get row and column value from data-position
const getCoords = (element) => {
    const [row, col] = element.getAttribute("data-position").split("_");
    return [parseInt(row), parseInt(col)];
};

// row1, col1 are image coordinates while row2 and col2 are blank image coordinates
const checkAdjacent = (row1, row2, col1, col2) => {
    if (row1 === row2) {
        // left/right
        if (col2 === col1 - 1 || col2 === col1 + 1) {
            return true;
        }
    } else if (col1 === col2) {
        // up/down
        if (row2 === row1 - 1 || row2 === row1 + 1) {
            return true;
        }
    }
    return false;
};

// Function to count inversions in the puzzle
const countInversions = (arr) => {
  let inversions = 0;
  for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
          // Count inversions, excluding the blank tile (9)
          if (arr[i] > arr[j] && arr[i] !== 9 && arr[j] !== 9) {
              inversions++;
          }
      }
  }
  return inversions;
};

// Function to check if the generated puzzle is solvable
const isSolvable = (arr) => {
  const inversions = countInversions(arr);
  return inversions % 2 === 0; // Solvable if even number of inversions
};

// Function to generate a solvable puzzle
const generateSolvablePuzzle = () => {
  do {
      imagesArr = [];
      // Randomly generate the sequence of images
      while (imagesArr.length < 8) {
          let randomVal = randomNumber();
          if (!imagesArr.includes(randomVal)) {
              imagesArr.push(randomVal);
          }
      }
      imagesArr.push(9); // Add the blank tile at the end
  } while (!isSolvable(imagesArr)); // Repeat until the puzzle is solvable
};

// Adjust startButton event to generate a solvable puzzle
startButton.addEventListener("click", () => {
  landingPage.style.display = 'none';
  puzzleContainer.style.display = 'flex';
  movesCount = 0;
  moves.innerText = `Moves: ${movesCount}`;
  generateSolvablePuzzle(); // Generate a guaranteed solvable puzzle
  puzzle.innerHTML = ''; // Clear previous puzzle
  generateGrid();
});

// Generate images in grid
const generateGrid = () => {
  let count = 0;
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          let div = document.createElement("div");
          div.setAttribute("data-position", `${i}_${j}`);
          div.addEventListener("click", selectImage);
          div.classList.add("image-container");

          // Check if the current image is the blank tile (9)
          if (imagesArr[count] === 9) {
              div.innerHTML = `<img src="" class="image target" data-index="${imagesArr[count]}"/>`;
          } else {
              div.innerHTML = `<img src="./images/image_part_00${imagesArr[count]}.jpg" class="image" data-index="${imagesArr[count]}"/>`;
          }
          count += 1;
          puzzle.appendChild(div);
      }
  }
};


// Adjust startButton event to generate a solvable puzzle
startButton.addEventListener("click", () => {
  landingPage.style.display = 'none';
  puzzleContainer.style.display = 'flex';
  movesCount = 0;
  moves.innerText = `Moves: ${movesCount}`;
  imagesArr = [];
  generateSolvablePuzzle(); // Generate solvable puzzle
  puzzle.innerHTML = ''; // Clear previous puzzle
  generateGrid();
});


const randomImages = () => {
  imagesArr = [];
  while (imagesArr.length < 8) {
      let randomVal = randomNumber();
      if (!imagesArr.includes(randomVal)) {
          imagesArr.push(randomVal);
      }
  }
  imagesArr.push(9); // Ensure that the blank tile is always at the end
};

startButton.addEventListener("click", () => {
    landingPage.style.display = 'none';
    puzzleContainer.style.display = 'flex';
    movesCount = 0;
    moves.innerText = `Moves: ${movesCount}`;
    imagesArr = [];
    randomImages();
    puzzle.innerHTML = ''; // Clear previous puzzle
    generateGrid();
});

// Switching puzzle
const selectImage = (e) => {
  e.preventDefault();
  // Set currentElement
  currentElement = e.target;
  // target (blank image)
  let targetElement = document.querySelector(".target");
  let currentParent = currentElement.parentElement;
  let targetParent = targetElement.parentElement;

  // get row and col values for both elements
  const [row1, col1] = getCoords(currentParent);
  const [row2, col2] = getCoords(targetParent);

  if (checkAdjacent(row1, row2, col1, col2)) {
      // Swap Images
      currentParent.appendChild(targetElement);
      targetParent.appendChild(currentElement);

      // Recalculate imagesArr based on current grid
      imagesArr = Array.from(puzzle.querySelectorAll('.image')).map(img => parseInt(img.getAttribute('data-index')));

      // Check Win Condition
      if (imagesArr.join('') === '123456789') {
          setTimeout(() => {
              alert(`Congratulations! You solved the puzzle in ${movesCount} moves!`);
              landingPage.style.display = '';
              puzzleContainer.style.display = 'none';
              startButton.innerText = "Restart Game";
          }, 1000);
      }
      
      // Increment and display move count
      movesCount += 1;
      moves.innerText = `Moves: ${movesCount}`;
  }
};