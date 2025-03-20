// canoncentration-ui.js - UI functionality for the Canoncentration game

// DOM elements
const gameBoard = document.getElementById('game-board');
const numMatchesSelect = document.getElementById('numMatches');
const startButton = document.getElementById('startButton');
const cheatButton = document.getElementById('cheatButton');
const eraLogosToggle = document.getElementById('eraLogosToggle');
const timerElement = document.getElementById('timer');
const cheatOverlay = document.getElementById('cheatOverlay');
const winMessage = document.getElementById('winMessage');
const winMessageText = document.getElementById('winMessageText');
const startPopup = document.getElementById('start-popup');
const startGameBtn = document.getElementById('start-game-btn');
const instructionsBtn = document.getElementById('instructions-btn');
const instructionsPopup = document.getElementById('instructions-popup');
const closeInstructionsBtn = document.getElementById('close-instructions-btn');

// Populate the dropdown with the number of available matches
function populateMatchesDropdown() {
    numMatchesSelect.innerHTML = '';
    
    // Create options from 3 to the number of available releases
    for (let i = 3; i <= releases.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        numMatchesSelect.appendChild(option);
    }
    
    // Set default value to 3 matches
    numMatchesSelect.value = 3;
}

// Show an OB01 face temporarily
function showObiFace(faceName, duration) {
    const obiFace = obiFaces.find(face => face.name === faceName);
    
    if (!obiFace) return;
    
    // Create a temporary element to display the face
    const faceElement = document.createElement('div');
    faceElement.className = 'obi-face';
    
    // Position to the right of the game board
    const gameBoardRect = gameBoard.getBoundingClientRect();
    faceElement.style.position = 'fixed';
    faceElement.style.top = '50%';
    faceElement.style.left = `${gameBoardRect.right + 30}px`;
    faceElement.style.transform = 'translateY(-50%)';
    faceElement.style.zIndex = '2000';
    faceElement.style.pointerEvents = 'none';
    
    // Load the SVG
    faceElement.innerHTML = `<img src="${obiFace.path}" alt="${faceName}" width="140" height="140">`;
    
    document.body.appendChild(faceElement);
    
    // Remove after duration
    setTimeout(() => {
        faceElement.remove();
    }, duration);
}

// Update the cheat panel with the current releases
function updateCheatPanel() {
    cheatOverlay.innerHTML = '';
    
    // Add heading to the cheat panel
    const cheatHeading = document.createElement('h3');
    cheatHeading.textContent = 'Ubuntu Release Guide';
    cheatOverlay.appendChild(cheatHeading);
    
    // Create a cheat item for each release
    selectedReleases.forEach(release => {
        const cheatItem = document.createElement('div');
        cheatItem.classList.add('cheat-item');
        
        cheatItem.innerHTML = `
            <p class="version">${release.version}</p>
            <p class="codename">${release.codename}</p>
            <div class="mascot"><img src="${release.svgPath}" alt="${release.codename}" width="80" height="80"></div>
        `;
        
        cheatOverlay.appendChild(cheatItem);
    });
}

// Toggle the cheat panel
function toggleCheat() {
    document.body.classList.toggle('cheat-active');
    
    // Show sad face when using cheat
    if (document.body.classList.contains('cheat-active')) {
        showObiFace("sad", 1500);
    }
}

// Create confetti effect
function createConfetti() {
    const confettiCount = 100;
    const container = document.body;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random position, delay and rotation
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Handle card click event
function handleCardClick(event) {
    // If game is not started yet, don't allow card flipping
    if (!timerInterval) {
        return;
    }
    
    if (isGamePaused) return;
    
    const card = event.currentTarget;
    
    // Prevent clicking the same card twice or clicking more than two cards
    if (card.classList.contains('flipped') || card.classList.contains('matched') || selectedCards.length >= 2) {
        return;
    }
    
    // Flip the card
    card.classList.add('flipped');
    selectedCards.push(card);
    
    // Check for match if two cards are flipped
    if (selectedCards.length === 2) {
        isGamePaused = true;
        setTimeout(checkForMatch, 1000);
    }
}

// Initialize popup event listeners
function initializePopups() {
    // Welcome popup event listener - only closes the popup
    startGameBtn.addEventListener('click', function() {
        startPopup.style.display = 'none';
        
        // Show OB01 wave face when popup closes
        showObiFace("wave", 2000);
    });
    
    // Instructions popup event listeners
    instructionsBtn.addEventListener('click', function() {
        instructionsPopup.style.display = 'flex';
    });
    
    closeInstructionsBtn.addEventListener('click', function() {
        instructionsPopup.style.display = 'none';
    });
}

// Helper function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Get the appropriate CoF path for a given era
function getCofForEra(era) {
    if (!useEraLogos) {
        // Always use the modern (22.04+) CoF logo when not using era-specific logos
        return coverSvgs.find(cof => cof.era === "modern").path;
    }
    
    const cofForEra = coverSvgs.find(cof => cof.era === era);
    return cofForEra ? cofForEra.path : coverSvgs[2].path; // Default to modern era if not found
}

// Render the cards to the game board
function renderCards(cards) {
    // Calculate optimal grid layout based on number of cards
    const numCards = cards.length;
    const numColumns = Math.ceil(Math.sqrt(numCards));
    gameBoard.style.gridTemplateColumns = `repeat(${numColumns}, 140px)`;
    
    // Create and append each card
    cards.forEach((cardData, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.type = cardData.type;
        card.dataset.value = cardData.value;
        card.dataset.pairId = cardData.pairId;
        card.dataset.svgPath = cardData.svgPath;
        card.dataset.era = cardData.era;
        
        // Get the appropriate CoF for this card's era
        const cofPath = getCofForEra(cardData.era);
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${cardData.value}</div>
                <div class="card-back"><img src="${cofPath}" alt="Ubuntu Logo" width="140" height="140"></div>
            </div>
        `;
        
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}
