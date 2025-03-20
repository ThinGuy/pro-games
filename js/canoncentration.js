// Ubuntu release data including version, codename, and SVG paths
const releases = [
    { version: "Ubuntu 4.10", codename: "Warty Warthog", svgPath: "images/mini-mascots/Ubuntu_4.10-Warty_Warthog.svg", era: "early" },
    { version: "Ubuntu 5.04", codename: "Hoary Hedgehog", svgPath: "images/mini-mascots/Ubuntu_5.04-Hoary_Hedgehog.svg", era: "early" },
    { version: "Ubuntu 5.10", codename: "Breezy Badger", svgPath: "images/mini-mascots/Ubuntu_5.10-Breezy_Badger.svg", era: "early" },
    { version: "Ubuntu 6.06", codename: "Dapper Drake", svgPath: "images/mini-mascots/Ubuntu_6.06-LTS_Dapper_Drake.svg", era: "early" },
    { version: "Ubuntu 6.10", codename: "Edgy Eft", svgPath: "images/mini-mascots/Ubuntu_6.10-Edgy_Eft.svg", era: "early" },
    { version: "Ubuntu 7.04", codename: "Feisty Fawn", svgPath: "images/mini-mascots/Ubuntu_7.04-Feisty_Fawn.svg", era: "early" },
    { version: "Ubuntu 7.10", codename: "Gutsy Gibbon", svgPath: "images/mini-mascots/Ubuntu_7.10-Gutsy_Gibbon.svg", era: "early" },
    { version: "Ubuntu 8.04", codename: "Hardy Heron", svgPath: "images/mini-mascots/Ubuntu_8.04-LTS_Hardy_Heron.svg", era: "early" },
    { version: "Ubuntu 8.10", codename: "Intrepid Ibex", svgPath: "images/mini-mascots/Ubuntu_8.10-Intrepid_Ibex.svg", era: "early" },
    { version: "Ubuntu 9.04", codename: "Jaunty Jackalope", svgPath: "images/mini-mascots/Ubuntu_9.04-Jaunty_Jackalope.svg", era: "early" },
    { version: "Ubuntu 9.10", codename: "Karmic Koala", svgPath: "images/mini-mascots/Ubuntu_9.10-Karmic_Koala.svg", era: "early" },
    { version: "Ubuntu 10.04", codename: "Lucid Lynx", svgPath: "images/mini-mascots/Ubuntu_10.04-LTS_Lucid_Lynx.svg", era: "early" },
    { version: "Ubuntu 10.10", codename: "Maverick Meerkat", svgPath: "images/mini-mascots/Ubuntu_10.10-Maverik_Meerkat.svg", era: "middle" },
    { version: "Ubuntu 11.04", codename: "Natty Narwhal", svgPath: "images/mini-mascots/Ubuntu_11.04-Natty_Narwhal.svg", era: "middle" },
    { version: "Ubuntu 11.10", codename: "Oneiric Ocelot", svgPath: "images/mini-mascots/Ubuntu_11.10-Oneiric_Ocelot.svg", era: "middle" },
    { version: "Ubuntu 12.04", codename: "Precise Pangolin", svgPath: "images/mini-mascots/Ubuntu_12.04-LTS_Precise_Pangolin.svg", era: "middle" },
    { version: "Ubuntu 12.10", codename: "Quantal Quetzal", svgPath: "images/mini-mascots/Ubuntu_12.10-Quantal_Quetzal.svg", era: "middle" },
    { version: "Ubuntu 13.04", codename: "Raring Ringtail", svgPath: "images/mini-mascots/Ubuntu_13.04-Raring_Ringtail.svg", era: "middle" },
    { version: "Ubuntu 13.10", codename: "Saucy Salamander", svgPath: "images/mini-mascots/Ubuntu_13.10-Saucy_Salamander.svg", era: "middle" },
    { version: "Ubuntu 14.04", codename: "Trusty Tahr", svgPath: "images/mini-mascots/Ubuntu_14.04-LTS_Trusty_Tahr.svg", era: "middle" },
    { version: "Ubuntu 14.10", codename: "Utopic Unicorn", svgPath: "images/mini-mascots/Ubuntu_14.10-Utopic_Unicorn.svg", era: "middle" },
    { version: "Ubuntu 15.04", codename: "Vivid Vervet", svgPath: "images/mini-mascots/Ubuntu_15.04-Vivid_Vervet.svg", era: "middle" },
    { version: "Ubuntu 15.10", codename: "Wily Werewolf", svgPath: "images/mini-mascots/Ubuntu_15.10-Willy_Werewolf.svg", era: "middle" },
    { version: "Ubuntu 16.04", codename: "Xenial Xerus", svgPath: "images/mini-mascots/Ubuntu_16.04-LTS_Xenial_Xerus.svg", era: "middle" },
    { version: "Ubuntu 16.10", codename: "Yakkety Yak", svgPath: "images/mini-mascots/Ubuntu_16.10-Yakkety_Yak.svg", era: "middle" },
    { version: "Ubuntu 17.04", codename: "Zesty Zapus", svgPath: "images/mini-mascots/Ubuntu_17.04-Zesty_Zapus.svg", era: "middle" },
    { version: "Ubuntu 17.10", codename: "Artful Aardvark", svgPath: "images/mini-mascots/Ubuntu_17.10-Artful_Aardvark.svg", era: "middle" },
    { version: "Ubuntu 18.04", codename: "Bionic Beaver", svgPath: "images/mini-mascots/Ubuntu_18.04-LTS_Bionic_Beaver.svg", era: "middle" },
    { version: "Ubuntu 18.10", codename: "Cosmic Cuttlefish", svgPath: "images/mini-mascots/Ubuntu_18.10-Cosmic_Cuttlefish.svg", era: "middle" },
    { version: "Ubuntu 19.04", codename: "Disco Dingo", svgPath: "images/mini-mascots/Ubuntu_19.04-Disco_Dingo.svg", era: "middle" },
    { version: "Ubuntu 19.10", codename: "Eoan Ermine", svgPath: "images/mini-mascots/Ubuntu_19.10-Eoan_Ermine.svg", era: "middle" },
    { version: "Ubuntu 20.04", codename: "Focal Fossa", svgPath: "images/mini-mascots/Ubuntu_20.04-LTS_Focal_Fossa.svg", era: "middle" },
    { version: "Ubuntu 20.10", codename: "Groovy Gorilla", svgPath: "images/mini-mascots/Ubuntu_20.10-Groovy_Gorilla.svg", era: "middle" },
    { version: "Ubuntu 21.04", codename: "Hirsute Hippo", svgPath: "images/mini-mascots/Ubuntu_21.04-Hirsute_Hippo.svg", era: "middle" },
    { version: "Ubuntu 21.10", codename: "Impish Indri", svgPath: "images/mini-mascots/Ubuntu_21.10-Impish_Indri.svg", era: "middle" },
    { version: "Ubuntu 22.04", codename: "Jammy Jellyfish", svgPath: "images/mini-mascots/Ubuntu_22.04-LTS_Jammy_Jellyfish.svg", era: "modern" },
    { version: "Ubuntu 22.10", codename: "Kinetic Kudu", svgPath: "images/mini-mascots/Ubuntu_22.10-Kinetic_Kudo.svg", era: "modern" },
    { version: "Ubuntu 23.04", codename: "Lunar Lobster", svgPath: "images/mini-mascots/Ubuntu_23.04-Lunar_Lobster.svg", era: "modern" },
    { version: "Ubuntu 23.10", codename: "Mantic Minotaur", svgPath: "images/mini-mascots/Ubuntu_23.10-Mantic_Minotaur.svg", era: "modern" },
    { version: "Ubuntu 24.04", codename: "Noble Numbat", svgPath: "images/mini-mascots/Ubuntu_24.04-LTS_Noble_Numbat.svg", era: "modern" },
    { version: "Ubuntu 24.10", codename: "Oracular Oriole", svgPath: "images/mini-mascots/Ubuntu_24.10-Oracular_Oriole.svg", era: "modern" },
    { version: "Ubuntu 25.04", codename: "Plucky Puffin", svgPath: "images/mini-mascots/Ubuntu_25.04-Plucky_Puffin.svg", era: "modern" }
];

// Circle of Friends (CoF) logos for different eras
const coverSvgs = [
    { era: "early", version: "Ubuntu 04.10-10.04", path: "images/cof/cof_2004-2010.svg" },
    { era: "middle", version: "Ubuntu 10.10-21.10", path: "images/cof/cof_2010-2022.svg" },
    { era: "modern", version: "Ubuntu 22.04+", path: "images/cof/cof-2022.svg" }
];

// SVGs for OB01 (Orangebox Mascot) various faces used with game messaging
const obiFaces = [
    { name: "woo", path: "images/ob01/ob-woo.svg" },
    { name: "scream", path: "images/ob01/ob-scream.svg" },
    { name: "wave", path: "images/ob01/ob-wave.svg" },
    { name: "sad", path: "images/ob01/ob-sad.svg" }
];

// Game variables
let selectedCards = [];
let matchedPairs = 0;
let startTime = 0;
let timerInterval;
let selectedReleases = [];
let isGamePaused = false;
let useEraLogos = false; // Default to not using era-specific logos
let currentEra = "modern"; // Default era for CoF (22.04+)

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
            startGame();
        });
    }
    
    // Show OB01 wave face
    showObiFace("wave", 2000);
    
    // Start a game with the default number of matches
    startGame();
});

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

// Start a new game
function startGame() {
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
    
    // Start the timer
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

// Handle card click event
function handleCardClick(event) {
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
    }
    
    // Reset selected cards
    selectedCards = [];
    isGamePaused = false;
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

// Show the win message and create confetti effect
function gameWon() {
    const endTime = Date.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    
    clearInterval(timerInterval);
    
    // Show the win message
    winMessageText.textContent = `You matched all the pairs in ${timeTaken} seconds!`;
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

// Helper function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
