/**
 * UI initialization and event handlers for the Ubuntu Whack-a-LTS game
 */

// Game elements
let gameContainer;
let scoreElement;
let timeElement;
let levelElement;
let startBtn;
let instructionsBtn;
let startPopup;
let startGameBtn;
let instructionsPopup;
let closeInstructionsBtn;
let gameOverPopup;
let finalScoreElement;
let finalLevelElement;
let performanceMessage;
let playAgainBtn;

// Initialize UI elements and event handlers
function initUI() {
    // Get all UI elements
    gameContainer = document.getElementById('game-container');
    scoreElement = document.getElementById('score');
    timeElement = document.getElementById('time');
    levelElement = document.getElementById('level');
    startBtn = document.getElementById('start-btn');
    instructionsBtn = document.getElementById('instructions-btn');
    startPopup = document.getElementById('start-popup');
    startGameBtn = document.getElementById('start-game-btn');
    instructionsPopup = document.getElementById('instructions-popup');
    closeInstructionsBtn = document.getElementById('close-instructions-btn');
    gameOverPopup = document.getElementById('game-over-popup');
    finalScoreElement = document.getElementById('final-score');
    finalLevelElement = document.getElementById('final-level');
    performanceMessage = document.getElementById('performance-message');
    playAgainBtn = document.getElementById('play-again-btn');
    
    // Setup event listeners
    startBtn.addEventListener('click', function() {
        console.log("Start button clicked");
        startGame();
    });
    
    startGameBtn.addEventListener('click', function() {
        console.log("Let's Play button clicked");
        startPopup.style.display = 'none';
        startGame();
    });
    
    instructionsBtn.addEventListener('click', function() {
        console.log("Instructions button clicked");
        instructionsPopup.style.display = 'flex';
    });
    
    closeInstructionsBtn.addEventListener('click', function() {
        console.log("Close Instructions button clicked");
        instructionsPopup.style.display = 'none';
    });
    
    playAgainBtn.addEventListener('click', function() {
        console.log("Play Again button clicked");
        gameOverPopup.style.display = 'none';
        startGame();
    });
    
    // Handle window resize
    window.addEventListener('resize', adjustForMobile);
    
    console.log("UI initialized");
}

// Start everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Initialize UI
    initUI();
    
    // Create initial game setup
    adjustForMobile();
    createHoles();
    
    // Load scores
    const scores = loadScores();
    highScore = scores.highScore;
    lastScore = scores.lastScore;
    
    console.log("Game initialized - waiting for player to start");
});/**
 * UI initialization and event handlers for the Ubuntu Whack-a-LTS game
 */

// Game elements
let gameContainer;
let scoreElement;
let timeElement;
let levelElement;
let startBtn;
let instructionsBtn;
let startPopup;
let startGameBtn;
let instructionsPopup;
let closeInstructionsBtn