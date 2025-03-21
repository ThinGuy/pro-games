/**
 * UI initialization and event handlers for the Ubuntu Whack-a-LTS game
 */

// Continue using the global namespace
window.WhackGame = window.WhackGame || {};

// UI controller
WhackGame.UI = {
    // Initialize UI elements and event handlers
    init: function() {
        console.log("Initializing UI...");
        
        // Setup event listeners
        const startBtn = document.getElementById('start-btn');
        const startGameBtn = document.getElementById('start-game-btn');
        const instructionsBtn = document.getElementById('instructions-btn');
        const closeInstructionsBtn = document.getElementById('close-instructions-btn');
        const playAgainBtn = document.getElementById('play-again-btn');
        const instructionsPopup = document.getElementById('instructions-popup');
        const gameOverPopup = document.getElementById('game-over-popup');
        
        if (startBtn) {
            startBtn.addEventListener('click', function() {
                console.log("Start button clicked");
                WhackGame.Game.startGame();
            });
        }
        
        if (startGameBtn) {
            startGameBtn.addEventListener('click', function() {
                console.log("Let's Play button clicked");
                document.getElementById('start-popup').style.display = 'none';
                WhackGame.Game.startGame();
            });
        }
        
        if (instructionsBtn) {
            instructionsBtn.addEventListener('click', function() {
                console.log("Instructions button clicked");
                instructionsPopup.style.display = 'flex';
            });
        }
        
        if (closeInstructionsBtn) {
            closeInstructionsBtn.addEventListener('click', function() {
                console.log("Close Instructions button clicked");
                instructionsPopup.style.display = 'none';
            });
        }
        
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', function() {
                console.log("Play Again button clicked");
                gameOverPopup.style.display = 'none';
                WhackGame.Game.startGame();
            });
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            WhackGame.Game.adjustForMobile();
        });
        
        console.log("UI initialized");
    }
};

// Start everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Initialize game components
    WhackGame.Game.init();
    WhackGame.UI.init();
    
    console.log("Game initialized - waiting for player to start");
});
