const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const resetBtn = document.getElementById('reset-btn');

let board = ['', '', '', '', '', '', '', '', '']; // Represents the game board
let currentPlayer = 'X'; // 'X' starts the game
let gameActive = true; // Game state

// Function to check for a winner
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            setStatus(`${currentPlayer} Wins!`);
            return;
        }
    }

    // Check if the board is full
    if (!board.includes('')) {
        gameActive = false;
        setStatus("It's a Draw!");
    }
};

// Function to set the status text
const setStatus = (message) => {
    statusText.textContent = message;
};

// Handle cell click
const handleCellClick = (index) => {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        checkWinner();

        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameActive) {
            setStatus(`Player ${currentPlayer}'s Turn`);
        }
    }
};

// Initialize the game
const initializeGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => cell.textContent = '');
};

// Event listeners for the game cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Event listener for the reset button
resetBtn.addEventListener('click', initializeGame);
