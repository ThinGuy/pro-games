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

// Update UI with current scores
function updateScoreDisplay() {
    const highScoreElements = document.querySelectorAll('#high-score, #start-high-score, #end-high-score');
    highScoreElements.forEach(el => {
        if (el) el.textContent = highScore;
    });
    
    const lastScoreElements = document.querySelectorAll('#last-score, #start-last-score, #end-last-score');
    lastScoreElements.forEach(el => {
        if (el) el.textContent = lastScore;
    });
    
    scoreElement.textContent = score;
    levelElement.textContent = level;
}

// Show a game event notification (for points or penalties)
function showNotification(text, isPositive = true) {
    const notification = document.createElement('div');
    notification.className = 'score-notification';
    notification.textContent = text;
    notification.style.position = 'absolute';
    notification.style.top = '100px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '100';
    notification.style.opacity = '0';
    notification.style.animation = 'fadeInOut 2s forwards';
    
    if (isPositive) {
        notification.style.backgroundColor = '#4CAF50'; // Green
    } else {
        notification.style.backgroundColor = '#F44336'; // Red
    }
    
    // Add animation if not already in stylesheet
    if (!document.getElementById('notification-animation')) {
        const style = document.createElement('style');
        style.id = 'notification-animation';
        style.innerHTML = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, 20px); }
                15% { opacity: 1; transform: translate(-50%, 0); }
                85% { opacity: 1; transform: translate(-50%, 0); }
                100% { opacity: 0; transform: translate(-50%, -20px); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
    }, 2000);
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
    
    // Display initial scores
    updateScoreDisplay();
    
    // Show the welcome popup
    startPopup.style.display = 'flex';
    
    console.log("Game initialized - waiting for player to start");
});
