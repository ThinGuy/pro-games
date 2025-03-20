// canoncentration-game.js - Core game logic for the Canoncentration game

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Populate the dropdown with match numbers
    populateMatchesDropdown();
    
    // Set up event listeners
    startButton.addEventListener('click', startGame);
    cheatButton.addEventListener('click', toggleCheat);
    
    if (eraLogosToggle) {
        eraLogosToggle.addEventListener('change', function() {
            useEraLogos = this.checked;
        });
    }
    
    // Initialize popups
    initializePopups();
    
    // Initialize game board (but don't start timer or game)
    initializeBoard();
    
    // Initialize scoring
    if (typeof initializeScoring === 'function') {
        initializeScoring();
    }
});

// Initialize the game board without starting the timer
function initializeBoard() {
    // Clear previous game
    clearGame();
    
    // Get the number of matches from user input
    const numMatches = parseInt(numMatchesSelect.value);
    
    // Select random releases for the game
    selectRandomReleases(numMatches);
    
    // Create and shuffle the cards
    const cards = createCards();
    shuffleArray(cards);
    
    // Render the cards to the game board
    renderCards(cards);
    
    // Set up the cheat panel
    updateCheatPanel();
    
    // Don't start the timer yet
    timerElement.textContent = 'Time: 0 s';
    
    // Set game state
    gameInitialized = true;
}

// Start a new game (begins timer)
function startGame() {
    // Initialize or reinitialize the board if needed
    if (!gameInitialized) {
        initializeBoard();
    } else {
        // If game was already initialized, we need to refresh the board
        clearGame();
        const numMatches = parseInt(numMatchesSelect.value);
        selectRandomReleases(numMatches);
        const cards = createCards();
        shuffleArray(cards);
        renderCards(cards);
        updateCheatPanel();
    }
    
    // Initialize scoring for new game
    if (typeof initializeScoring === 'function') {
        initializeScoring();
    }
    
    // Start the timer (this is what makes the game "active")
    startTimer();
}

// Clear the previous game state
function clearGame() {
    gameBoard.innerHTML = '';
    cheatOverlay.innerHTML = '';
    selectedCards = [];
    matchedPairs = 0;
    isGamePaused = false;
    document.body.classList.remove('cheat-active');
    clearInterval(timerInterval);
    
    // Clear any confetti
    const confetti = document.querySelectorAll('.confetti');
    confetti.forEach(c => c.remove());
}

// Select random releases for the game
function selectRandomReleases(numMatches) {
    // Create a copy of the releases array
    const availableReleases = [...releases];
    
    // Shuffle it
    shuffleArray(availableReleases);
    
    // Take the first numMatches releases
    selectedReleases = availableReleases.slice(0, numMatches);
}

// Create the cards for the game
function createCards() {
    let cards = [];
    
    // Create pairs of version and codename cards
    selectedReleases.forEach(release => {
        cards.push({ 
            type: 'version', 
            value: release.version, 
            svgPath: release.svgPath, 
            era: release.era,
            pairId: release.version // Use version as pair ID
        });
        
        cards.push({ 
            type: 'codename', 
            value: release.codename, 
            svgPath: release.svgPath, 
            era: release.era,
            pairId: release.version // Use version as pair ID for matching
        });
    });
    
    return cards;
}

// Check if the two selected cards match
function checkForMatch() {
    const card1 = selectedCards[0];
    const card2 = selectedCards[1];
    
    // Check if they have the same pair ID but different types
    if (card1.dataset.pairId === card2.dataset.pairId && 
        card1.dataset.type !== card2.dataset.type) {
        
        // Match found!
        card1.classList.add('matched');
        card2.classList.add('matched');
        
        // Display mascot on matched cards (load SVG from path)
        const svgPath = card1.dataset.svgPath;
        
        // Load both cards with the mascot SVG
        card1.querySelector('.card-front').innerHTML = `<img src="${svgPath}" alt="${card1.dataset.value}" width="140" height="140">`;
        card2.querySelector('.card-front').innerHTML = `<img src="${svgPath}" alt="${card2.dataset.value}" width="140" height="140">`;
        
        // Set the background to white for matched cards
        card1.querySelector('.card-front').style.backgroundColor = "white";
        card2.querySelector('.card-front').style.backgroundColor = "white";
        
        // Show "woo" face for successful match
        showObiFace("woo", 1000);
        
        // Update score for the match
        if (typeof scoreMatch === 'function') {
            scoreMatch(card1, card2);
        }
        
        matchedPairs++;
        
        // Check if all pairs are matched
        if (matchedPairs === selectedReleases.length) {
            gameWon();
        }
    } else {
        // No match, flip the cards back
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        
        // Show "scream" or "sad" face for incorrect match
        const randomFace = Math.random() < 0.5 ? "scream" : "sad";
        showObiFace(randomFace, 1000);
        
        // Update score for wrong match
        if (typeof scoreWrongMatch === 'function') {
            scoreWrongMatch();
        }
    }
    
    // Reset selected cards
    selectedCards = [];
    isGamePaused = false;
}

// Start the timer
function startTimer() {
    startTime = Date.now();
    timerElement.textContent = 'Time: 0 s';
    
    clearInterval(timerInterval);
    timerInterval = setInterval(function() {
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        timerElement.textContent = `Time: ${elapsedSeconds} s`;
    }, 1000);
}

// Show the win message and create confetti effect
function gameWon() {
    const endTime = Date.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    const numMatches = selectedReleases.length;
    
    clearInterval(timerInterval);
    
    // Calculate time bonus if available
    let timeBonus = 0;
    if (typeof calculateTimeBonus === 'function') {
        timeBonus = calculateTimeBonus(numMatches, parseFloat(timeTaken));
        
        if (timeBonus > 0) {
            // Show notification for time bonus
            showScoreNotification(`Time Bonus: +${timeBonus}`, 'time-bonus');
            
            // Update score with time bonus
            currentScore += timeBonus;
            updateScoreDisplay();
        }
    }
    
    // Save score if available
    if (typeof saveScore === 'function') {
        saveScore(numMatches, currentScore, parseFloat(timeTaken));
    }
    
    // Show the win message
    let message = `You matched all the pairs in ${timeTaken} seconds!`;
    
    // Add score information if available
    if (typeof currentScore !== 'undefined') {
        message += `<br>Final Score: ${currentScore}`;
        
        // Add time bonus info if applicable
        if (timeBonus > 0) {
            message += ` (includes ${timeBonus} time bonus points!)`;
        }
    }
    
    winMessageText.innerHTML = message;
    winMessage.style.display = 'block';
    
    // Create confetti effect
    createConfetti();
    
    // Show woo face for winning
    showObiFace("woo", 3000);
}

// Close the win message
function closeWinMessage() {
    winMessage.style.display = 'none';
    startGame();
}
